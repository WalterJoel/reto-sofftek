import { Test, TestingModule } from '@nestjs/testing';
import { FusionService } from './fusion.service';
import { SwapiService } from '../api/swapi/swapi.service';
import { ForecastService } from '../api/forecast/forecast.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

const mockSwapiService = {
  findPeople: jest.fn(),
  findOnePlanet: jest.fn(),
};

const mockForecastService = {
  getWeatherForPlanet: jest.fn(),
};

const mockHttpService = {
  get: jest.fn(() => of({ data: {} })),
};

describe('FusionService', () => {
  let service: FusionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FusionService,
        { provide: SwapiService, useValue: mockSwapiService },
        { provide: ForecastService, useValue: mockForecastService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<FusionService>(FusionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
