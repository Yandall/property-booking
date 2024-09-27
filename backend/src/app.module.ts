import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesModule } from './properties/properties.module';
import { BookingsModule } from './bookings/bookings.module';
import { PropertiesService } from './properties/properties.service';
import { Property } from './properties/property.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'property_booking',
      synchronize: true,
      autoLoadEntities: true,
    }),
    PropertiesModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PropertiesService],
})
export class AppModule {}
