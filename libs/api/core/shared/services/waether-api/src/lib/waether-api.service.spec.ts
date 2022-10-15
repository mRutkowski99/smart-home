import { Test } from '@nestjs/testing';
import { WeatherApiService } from './waether-api.service';

describe('WeatherApiService', () => {
  let service: WeatherApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [WeatherApiService],
    }).compile();

    service = module.get(WeatherApiService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
