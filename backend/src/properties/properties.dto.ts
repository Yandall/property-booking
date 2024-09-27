import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(1)
  pricePerNight: number;
}

export class UpdatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(1)
  pricePerNight: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  availabilityStart: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  availabilityEnd: Date;
}
