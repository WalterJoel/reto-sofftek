import { Test, TestingModule } from '@nestjs/testing';
import { FusionController } from './fusion.controller';
import { FusionService } from './fusion.service';
import { SwapiService } from '../api/swapi/swapi.service';
import { ForecastService } from '../api/forecast/forecast.service';
import { HttpService } from '@nestjs/axios'; // Importamos HttpService
import { CreateCustomDto } from './dto/create-custom.dto';
import { of } from 'rxjs';

const mockSwapiService = {
  findPeople: jest.fn(),
  findOnePlanet: jest.fn(),
};

const mockForecastService = {
  getWeatherForPlanet: jest.fn(),
};

const mockFusionService = {
  createCustomInformation: jest.fn(),
  getFusionados: jest.fn(),
  getHistorial: jest.fn(),
};

const mockHttpService = {
  get: jest.fn(() => of({ data: {} })),
};

describe('FusionController', () => {
  let controller: FusionController;
  let fusionService: FusionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FusionController],
      providers: [
        { provide: FusionService, useValue: mockFusionService },
        { provide: SwapiService, useValue: mockSwapiService },
        { provide: ForecastService, useValue: mockForecastService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    controller = module.get<FusionController>(FusionController);
    fusionService = module.get<FusionService>(FusionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createCustomInformation when creating custom info', async () => {
    const createCustomDto: CreateCustomDto = { name: 'Test' };
    await controller.createCustomInformation(createCustomDto);
    expect(fusionService.createCustomInformation).toHaveBeenCalledWith(
      createCustomDto,
    );
  });

  it('should call getFusionados and return response', async () => {
    const mockResponse = { message: 'Success', data: [] };
    mockFusionService.getFusionados.mockResolvedValue(mockResponse);

    const result = await controller.getFusionados();
    expect(result).toEqual(mockResponse);
  });

  it('should call getHistorial and return paginated response', async () => {
    const mockResponse = { message: 'Success', data: [], lastKey: null };
    mockFusionService.getHistorial.mockResolvedValue(mockResponse);

    const result = await controller.getHistorial(10, 'someKey');
    expect(result).toEqual(mockResponse);
  });
});
