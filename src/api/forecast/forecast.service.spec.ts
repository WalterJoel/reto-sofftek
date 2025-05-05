import { Test, TestingModule } from '@nestjs/testing';
import { ForecastService } from './forecast.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs'; // Necesario para mockear las respuestas de la API
import { WeatherDto } from './dto/weather.dto';

describe('ForecastService', () => {
  let service: ForecastService;
  let httpService: HttpService;

  const mockWeatherData = {
    current_weather: {
      time: '2025-05-05T13:00',
      temperature: '25',
      windspeed: '10',
    },
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForecastService,
        { provide: HttpService, useValue: mockHttpService }, // Mockeamos HttpService
      ],
    }).compile();

    service = module.get<ForecastService>(ForecastService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return weather data for a valid planet', async () => {
    mockHttpService.get.mockReturnValue(of({ data: mockWeatherData }));

    const result = await service.getPlanetWeather('Tatooine');

    expect(result).toBeInstanceOf(WeatherDto);
    expect(result.temperature.trim()).toBe('25');
    expect(result.windspeed.trim()).toBe('10');
  });
});
