import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { CreatePropertyDto, UpdatePropertyDto } from './properties.dto';
import { CreateBookingDto } from 'src/bookings/bookings.dto';

@Controller('properties')
export class PropertiesController {
  constructor(
    @Inject() private readonly propertiesService: PropertiesService,
    @Inject() private readonly bookingsService: BookingsService,
  ) {}

  @Get()
  async getAllProperties() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.propertiesService.findAll();
  }

  @Get(':id')
  async getProperty(@Param('id') id: number) {
    return this.propertiesService.getPropertyById(id);
  }

  @Put(':id')
  async updateProperty(
    @Param('id') id: number,
    @Body() property: UpdatePropertyDto,
  ) {
    return this.propertiesService.updateProperty(id, property);
  }

  @Delete(':id')
  async deleteProperty(@Param('id') id: number) {
    return this.propertiesService.deleteProperty(id);
  }

  @Post()
  async createProperty(@Body() property: CreatePropertyDto) {
    return this.propertiesService.createProperty(property);
  }

  @Get(':id/bookings')
  async getBookingsByPropertyId(@Param('id') id: number) {
    return this.bookingsService.findAllBookingsByPropertyId(id);
  }

  @Post(':id/book')
  async createBooking(
    @Param('id') id: number,
    @Body() booking: CreateBookingDto,
  ) {
    return this.bookingsService.createBooking(id, booking);
  }
}
