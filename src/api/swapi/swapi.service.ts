import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SWAPI_BASE_URL } from '../../utils/constants';
import { PlanetDto } from './dto/planet.dto';
import { PersonDto, PeopleResponse } from './dto/person.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SwapiService {
  constructor(private readonly httpService: HttpService) {}

  async findPeople(): Promise<PersonDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PeopleResponse>(`${SWAPI_BASE_URL}/people`),
      );

      const normalizedPeople = plainToInstance(
        PersonDto,
        response.data.results,
        {
          excludeExtraneousValues: true,
        },
      );
      return normalizedPeople;
    } catch (error) {
      throw new Error('Error fetching people data: ' + error.message);
    }
  }
  async findOnePlanet(id: number): Promise<PlanetDto> {
    try {
      const responseData = await firstValueFrom(
        this.httpService.get(`${SWAPI_BASE_URL}/planets/${id}/`),
      );

      const normalizedPlanet = plainToInstance(PlanetDto, responseData.data, {
        excludeExtraneousValues: true,
      });
      return normalizedPlanet;
    } catch (error) {
      throw new Error('Error fetching planet data: ' + error.message);
    }
  }
}
