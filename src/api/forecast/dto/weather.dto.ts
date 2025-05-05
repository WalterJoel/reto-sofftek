import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class WeatherDto {
  @Expose()
  @Transform(
    ({ obj }) => `${obj?.current_weather?.time ?? 'No time available'}`,
  )
  time: string;

  @Expose()
  @Transform(
    ({ obj }) =>
      `${obj?.current_weather?.temperature ?? 'No temperature available'} ${
        obj?.current_weather_units?.temperature ?? ''
      }`,
  )
  temperature: string;

  @Expose()
  @Transform(
    ({ obj }) =>
      `${obj?.current_weather?.windspeed ?? 'No windspeed available'} ${
        obj?.current_weather_units?.windspeed ?? ''
      }`,
  )
  windspeed: string;
}
