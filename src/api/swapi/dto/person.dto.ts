import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonDto {
  @Expose()
  name: string;

  @Expose()
  skin_color: string;

  @Expose()
  height: string;

  @Expose()
  gender: string;

  @Expose()
  homeworld: string;
}

export interface PeopleResponse {
  results: PersonDto[];
}
