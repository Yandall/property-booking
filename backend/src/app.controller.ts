import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('bootstrap')
  async bootstrap() {
    return this.appService.bootstrap();
  }
}
