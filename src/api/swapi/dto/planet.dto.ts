import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlanetDto {
  @Expose()
  name: string;

  @Expose()
  climate: string;

  @Expose()
  terrain: string;
}
