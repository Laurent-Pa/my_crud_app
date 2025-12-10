import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Route: GET / (root for localhost:3000)
  @Get()
  getInfo() {
    return this.appService.getInfo();
  }

  // Route: GET /health (specific to check cloud health)
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'restaurant-api',
    };
  }
}
