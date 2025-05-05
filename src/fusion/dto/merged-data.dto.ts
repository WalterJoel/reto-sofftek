import { ApiProperty } from '@nestjs/swagger';

interface PersonDTO {
  gender: string;
  skinColor: string;
  height: string;
  homeworld: string;
}

interface PlanetDTO {
  name: string;
  climate: string;
  terrain: string;
}

interface WeatherDTO {
  temperature: string;
  windspeed: string;
  time: string;
}

export class MergedDataDTO {
  @ApiProperty({
    description: 'Información del personaje.',
    type: Object,
  })
  person: PersonDTO;

  @ApiProperty({
    description: 'Información del planeta de origen.',
    type: Object,
  })
  originPlanet: PlanetDTO;

  @ApiProperty({
    description: 'Información sobre el clima actual del planeta.',
    type: Object,
  })
  currentWeather: WeatherDTO;
}
