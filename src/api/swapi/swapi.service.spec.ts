import { Test, TestingModule } from '@nestjs/testing';
import { SwapiService } from './swapi.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { PlanetDto } from './dto/planet.dto';
import { PersonDto, PeopleResponse } from './dto/person.dto';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiService,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPeople', () => {
    it('should return an array of people', async () => {
      const mockPeopleResponse: PeopleResponse = {
        results: [
          {
            name: 'Luke Skywalker',
            gender: 'male',
            height: '170',
            homeworld: '',
            skin_color: '',
          },
        ],
      };

      mockHttpService.get.mockReturnValue(of({ data: mockPeopleResponse }));

      const result = await service.findPeople();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(PersonDto);
      expect(result[0].name).toEqual('Luke Skywalker');
    });

    it('should throw an error if there is an issue fetching people data', async () => {
      mockHttpService.get.mockReturnValueOnce(of({ error: 'Error' }));

      await expect(service.findPeople()).rejects.toThrowError(
        'Error fetching people data',
      );
    });
  });

  describe('findOnePlanet', () => {
    it('should return a planet data', async () => {
      const mockPlanetResponse = {
        name: 'Tatooine',
        population: '200000',
      };

      mockHttpService.get.mockReturnValue(of({ data: mockPlanetResponse }));

      const planetId = 1;
      const result = await service.findOnePlanet(planetId);

      expect(result).toBeInstanceOf(PlanetDto);
      expect(result.name).toEqual('Tatooine');
    });
    it('should throw an error if there is an issue fetching planet data', async () => {
      mockHttpService.get.mockReturnValueOnce(
        throwError(() => new Error('Error fetching planet data')),
      );

      const planetId = 1;
      await expect(service.findOnePlanet(planetId)).rejects.toThrowError(
        'Error fetching planet data',
      );
    });
  });
});
