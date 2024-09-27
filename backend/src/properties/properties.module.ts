import { forwardRef, Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { BookingsModule } from 'src/bookings/bookings.module';
import { BookingsService } from 'src/bookings/bookings.service';
import { Booking } from 'src/bookings/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    forwardRef(() => BookingsModule),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, BookingsService],
  exports: [TypeOrmModule.forFeature([Property])],
})
export class PropertiesModule {}
