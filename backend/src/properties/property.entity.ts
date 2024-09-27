import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  pricePerNight: number;

  @Column()
  availabilityStart: Date;

  @Column()
  availabilityEnd: Date;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @BeforeInsert()
  setAvailability() {
    this.availabilityStart = new Date(0);
    this.availabilityEnd = new Date();
    this.availabilityEnd.setUTCFullYear(2300);
  }
}
