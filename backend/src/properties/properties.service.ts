import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto, UpdatePropertyDto } from './properties.dto';
import { isNumber } from 'class-validator';
import { Booking } from 'src/bookings/booking.entity';
import { getError } from 'src/shared/errorMessages';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAll() {
    return this.propertyRepository.find();
  }

  async updateProperty(id: number, property: UpdatePropertyDto) {
    if (!isNumber(id)) {
      throw getError('Property id is not a number', HttpStatus.BAD_REQUEST);
    }
    return this.propertyRepository.update(id, property);
  }

  async deleteProperty(id: number) {
    if (!isNumber(id)) {
      throw getError('Property id is not a number', HttpStatus.BAD_REQUEST);
    }
    this.bookingRepository.delete({
      property: { id },
    });
    return this.propertyRepository.delete(id);
  }

  async createProperty(property: CreatePropertyDto) {
    const newProperty = this.propertyRepository.create(property);
    return this.propertyRepository.save(newProperty);
  }

  async getPropertyById(id: number) {
    if (!isNumber(id)) {
      throw getError('Property id is not a number', HttpStatus.BAD_REQUEST);
    }
    return this.propertyRepository.findOne({
      where: { id },
    });
  }

  async updatePropertyAvailability(id: number, checkOut: Date) {
    return this.propertyRepository.update(id, {
      availabilityStart: checkOut,
    });
  }
}
