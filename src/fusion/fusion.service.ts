import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SwapiService } from '../api/swapi/swapi.service';
import { ForecastService } from '../api/forecast/forecast.service';
import { v4 as uuid } from 'uuid';
import { FusionModel } from './entities/fusion.model';
import { CustomModel } from './entities/custom.model';
import { CACHE_TTL_MINUTES } from '../utils/constants';
import * as dayjs from 'dayjs';
import { CreateCustomDto } from './dto/create-custom.dto';
import { MergedDataDTO } from './dto/merged-data.dto';

@Injectable()
export class FusionService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly forecastService: ForecastService,
  ) {}

  async getFusionados() {
    return await this.getOrCreateCachedFusionData();
  }

  async createCustomInformation(createCustomDto: CreateCustomDto) {
    try {
      const customInformation = await CustomModel.create({
        id: uuid(),
        ...createCustomDto,
      });
      return {
        message: 'Se insertó con éxito la información ingresada',
        data: customInformation,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo guardar los datos: ' + error.message,
      );
    }
  }
  async getHistorial(limit, nextKey?: string) {
    limit = parseInt(limit);
    const params: any = { limit };

    if (nextKey) {
      try {
        params.startAt = JSON.parse(
          Buffer.from(nextKey, 'base64').toString('utf8'),
        );
      } catch (error) {
        throw new Error('nextKey inválido');
      }
    }

    const result = await FusionModel.scan()
      .limit(limit)
      .startAt(params.startAt)
      .exec();

    const orderedItems = result
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .map((item) => ({
        id: item.id,
        createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm'),
        updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm'),
        mergedData: item.mergedData,
      }));

    const encodedNextKey = result.lastKey
      ? Buffer.from(JSON.stringify(result.lastKey)).toString('base64')
      : null;

    return {
      nextKey: encodedNextKey,
      items: orderedItems,
    };
  }

  // Sistema de cacheo
  private async getOrCreateCachedFusionData() {
    const items = await FusionModel.scan().exec();
    if (items && items.length > 0) {
      const latestItem = items.sort((a, b) => b.createdAt - a.createdAt)[0];

      if (latestItem && latestItem.createdAt) {
        const now = dayjs();
        const createdTime = dayjs(latestItem.createdAt);
        const diffMinutes = now.diff(createdTime, 'minute');

        if (diffMinutes < CACHE_TTL_MINUTES) {
          return {
            message: 'Datos obtenidos desde cache',
            data: latestItem.mergedData,
          };
        }
      }
    }

    const mergedData = await this.mergeData();
    await this.saveToCache(mergedData);
    return {
      message: 'Datos obtenidos luego de hacer llamada a las APIS',
      data: mergedData,
    };
  }

  private saveToCache = async (mergedData) => {
    try {
      await FusionModel.create({
        id: uuid(),
        mergedData,
      });
    } catch (error) {
      throw new Error('No se pudo guardar los datos en la caché');
    }
  };

  private mergeData = async (): Promise<Record<string, MergedDataDTO>> => {
    const people = await this.swapiService.findPeople();

    const mergedData: Record<string, MergedDataDTO> = {};

    await Promise.all(
      people.map(async (person) => {
        try {
          const planetId = parseInt(
            person.homeworld.split('/').filter(Boolean).pop(),
          );

          const planetData = await this.swapiService.findOnePlanet(planetId);
          const planetWeather = await this.forecastService.getPlanetWeather(
            planetData.name,
          );

          mergedData[person.name] = {
            person: {
              gender: person.gender,
              skinColor: person.skin_color,
              height: person.height,
              homeworld: person.homeworld,
            },
            originPlanet: {
              name: planetData.name,
              climate: planetData.climate,
              terrain: planetData.terrain,
            },
            currentWeather: {
              temperature: planetWeather.temperature,
              windspeed: planetWeather.windspeed,
              time: planetWeather.time,
            },
          };
        } catch (error) {
          console.warn(
            `Fallo al fusionar datos de ${person.name}:`,
            error.message,
          );
          return error;
        }
      }),
    );

    return mergedData;
  };
}
