import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherApiService } from './waether-api.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [WeatherApiService],
  exports: [WeatherApiService],
})
export class WaetherApiModule {}
