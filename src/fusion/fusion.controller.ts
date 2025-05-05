import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { CreateCustomDto } from './dto/create-custom.dto';
import {
  ApiTags,
  ApiQuery,
  ApiBody,
  ApiOperation,
  ApiOkResponse,
  ApiExtraModels,
  ApiResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Endpoints')
export class FusionController {
  constructor(private readonly fusionService: FusionService) {}

  @ApiOperation({
    summary: 'Guardar evento o tarea personalizada',
    description:
      '✅ Este endpoint permite almacenar información definida por el usuario, como tareas, eventos u observaciones.\n\n' +
      '✅ No está relacionado con las APIs externas.\n\n' +
      '⚠️ El campo `name` es el único obligatorio. Asegúrate de enviarlo como tipo `string`.',
  })
  @ApiBody({
    description: 'Información personalizada para almacenar',
    type: CreateCustomDto,
  })
  @Post('/almacenar')
  createCustomInformation(@Body() createCustomDto: CreateCustomDto) {
    return this.fusionService.createCustomInformation(createCustomDto);
  }

  @ApiOperation({
    summary: 'Obtener datos fusionados',
    description:
      '✅ Fusiona datos desde la API de Star Wars (SWAPI) y una API meteorológica externa (Open-Meteo).\n\n' +
      '🧠 **Comportamiento inteligente de caché:**\n\n' +
      '   ✅ Si la solicitud fue realizada en los últimos 30 minutos, se devuelve una respuesta desde caché.\n\n' +
      '   ✅ Si no hay datos recientes, se consultan las APIs externas, se procesan los resultados, se guardan y se devuelven actualizados.\n\n' +
      '✅ **Respuesta esperada:**\n' +
      ' -  `message`, Indica si la respuesta viene de caché o se procesa todo de nuevo\n\n' +
      ' -  `data`, La data fusionada tiene:\n\n' +
      '         • Detalles de su planeta de origen\n' +
      '         • Información del personaje (de SWAPI)\n' +
      '         • Clima actual del planeta\n\n' +
      '⚠️ **Nota:** Se procesan todos los personajes retornados por SWAPI, por lo que la respuesta puede ser extensa.',
  })
  @ApiOkResponse({
    description: 'Datos fusionados obtenidos correctamente.',
  })
  @Get('/fusionados')
  getFusionados() {
    return this.fusionService.getFusionados();
  }

  // Historial

  @Get('/historial')
  @ApiOperation({
    summary: 'Consultar historial de fusiones',
    description:
      '✅ Este endpoint devuelve el historial completo de resultados previamente almacenados por el endpoint `/fusionados`. \n\n' +
      '✅ Los resultados están ordenados cronológicamente, mostrando primero los más recientes. \n\n' +
      '✅ Soporta paginación mediante dos parámetros: `limit`, que indica la cantidad máxima de elementos por página, y `nextKey`, que permite continuar desde donde terminó la consulta anterior. \n\n' +
      '⚠️ **Obtener la siguiente página**  \n\n' +
      ' -  Copiar el valor de `lastKey` retornado en la respuesta previa y pasarlo como `nextKey` en la siguiente solicitud.\n\n' +
      '⚠️ **Nota:** Si `lastKey` es `null`, significa que no hay más datos por paginar.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad máxima de resultados por página.',
  })
  @ApiQuery({
    name: 'nextKey',
    required: false,
    type: String,
    description:
      'Clave de paginación para continuar desde el último resultado (formato codificado).',
  })
  getHistorial(
    @Query('limit') limit?: number,
    @Query('nextKey') nextKey?: string,
  ) {
    return this.fusionService.getHistorial(limit, nextKey);
  }
}
