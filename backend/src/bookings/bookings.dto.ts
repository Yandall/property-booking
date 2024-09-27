import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  checkIn: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  checkOut: Date;

  property: { id: number };
}
