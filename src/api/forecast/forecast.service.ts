import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { planetCoordinates, OPEN_METEO_BASE_URL } from '../../utils/constants';
import { firstValueFrom } from 'rxjs';
import { WeatherDto } from './dto/weather.dto';

@Injectable()
export class ForecastService {
  constructor(private readonly httpService: HttpService) {}

  async getPlanetWeather(planetName: string) {
    try {
      const coords = planetCoordinates[planetName];
      if (!coords) {
        throw new Error(`Coordinates not mapped for planet "${planetName}"`);
      }
      const weatherUrl = `${OPEN_METEO_BASE_URL}?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
      const weatherRes = await firstValueFrom(this.httpService.get(weatherUrl));

      const formattedWeather = plainToInstance(WeatherDto, weatherRes.data, {
        excludeExtraneousValues: true,
      });

      return formattedWeather;
    } catch (error) {
      console.log(error, ' ERROR');
      throw new Error(
        `Failed to fetch weather data for planet "${planetName}${error}"`,
      );
    }
  }
}
