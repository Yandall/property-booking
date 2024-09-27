import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './bookings.dto';
import { PropertiesService } from 'src/properties/properties.service';
import { isNumber } from 'class-validator';
import { getError } from 'src/shared/errorMessages';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly propertiesService: PropertiesService,
  ) {}

  async isAvailable(propertyId: number, checkIn: Date, checkOut: Date) {
    let availability = checkIn.getTime() < checkOut.getTime();
    const property = await this.propertiesService.getPropertyById(propertyId);
    if (!property) {
      throw getError('Property not found', HttpStatus.BAD_REQUEST);
    }

    // With only two variables is not enough to check for all the possible available dates
    // In this case I avoiding collisions with the last booking created
    availability &&= checkIn.getTime() > property.availabilityStart.getTime();
    return availability;
  }

  async createBooking(propertyId: number, booking: CreateBookingDto) {
    if (!isNumber(propertyId)) {
      throw getError('Property id is not a number', HttpStatus.BAD_REQUEST);
    }
    if (
      !(await this.isAvailable(propertyId, booking.checkIn, booking.checkOut))
    ) {
      throw getError(
        'Booking is not available between dates selected',
        HttpStatus.BAD_REQUEST,
      );
    }

    booking.property = {
      id: propertyId,
    };
    const newBooking = this.bookingRepository.create(booking);
    await this.bookingRepository.save(booking);
    await this.propertiesService.updatePropertyAvailability(
      propertyId,
      booking.checkOut,
    );
    return this.bookingRepository.findOne({
      where: { id: newBooking.id },
      relations: { property: true },
    });
  }
  async findAllBookingsByPropertyId(propertyId: number) {
    if (!isNumber(propertyId)) {
      throw getError('Property id is not a number', HttpStatus.BAD_REQUEST);
    }
    return this.bookingRepository.find({
      where: { property: { id: propertyId } },
      relations: { property: true },
    });
  }
}
