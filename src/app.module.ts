import { Module } from '@nestjs/common';
import { SwapiModule } from 'src/api/swapi/swapi.module';
import { FusionModule } from './fusion/fusion.module';

@Module({
  imports: [SwapiModule, FusionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
