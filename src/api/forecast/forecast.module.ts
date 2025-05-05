import { Module } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [ForecastService],
  exports: [ForecastService],
})
export class ForecastModule {}
