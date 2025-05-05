import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomDto {
  @ApiProperty({
    example: 'Respaldo completado',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Se ejecutó el respaldo de la base de datos a las 03:00 AM.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: {
      responsable: 'admin',
      prioridad: 'alta',
      fecha: '2025-05-04T03:00:00Z',
    },
    required: false,
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  customData?: Record<string, any>;
}
