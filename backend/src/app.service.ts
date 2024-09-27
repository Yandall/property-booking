import { Inject, Injectable } from '@nestjs/common';
import { PropertiesService } from './properties/properties.service';
import { CreatePropertyDto } from './properties/properties.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject() private readonly propertiesService: PropertiesService,
  ) {}

  async bootstrap() {
    const properties: CreatePropertyDto[] = [
      {
        name: 'Silvertown on Park Ave',
        location: 'Park City',
        pricePerNight: 371,
      },
      {
        name: 'The Penthouse at Apex',
        location: 'Park City',
        pricePerNight: 1446,
      },
      {
        name: 'Deer Valley East',
        location: 'Park City',
        pricePerNight: 471,
      },
    ];

    await Promise.all(
      properties.map(async (property) => {
        await this.propertiesService.createProperty(property);
      }),
    );
    return { message: 'Bootstrap completed, 3 new properties created' };
  }
}
