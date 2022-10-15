import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class WeatherApiService {
  constructor(private readonly http: HttpService) {}

  private readonly countryCode = 'PL';
  private readonly apiKey = 'fc4e7495d88d009ed1184ae03613cfb';

  getGeolocation(zipCode: string) {
    const geolocation$ = this.http
      .get(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${this.countryCode}&appid=${this.apiKey}`
      )
      .pipe(map((response) => response.data));

    return firstValueFrom(geolocation$);
  }
}
