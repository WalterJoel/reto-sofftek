import { Module } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { ForecastModule } from 'src/api/forecast/forecast.module';
import { FusionController } from './fusion.controller';
import { SwapiModule } from 'src/api/swapi/swapi.module';

@Module({
  controllers: [FusionController],
  providers: [FusionService],
  imports: [SwapiModule, ForecastModule],
})
export class FusionModule {}
