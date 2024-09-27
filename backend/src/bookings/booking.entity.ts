import { Property } from 'src/properties/property.entity';
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property, (property) => property.id, { nullable: false })
  property: Property;

  @Column()
  customerName: string;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  protected totalPrice: number;

  @AfterLoad()
  totalPriceCalculation() {
    const totalDays = Math.ceil(
      (this.checkOut.getTime() - this.checkIn.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    this.totalPrice = this.property.pricePerNight * totalDays;
  }
}
