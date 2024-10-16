import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { HttpModule } from '@nestjs/axios';
import { ApiConfigService } from 'src/config/api.config.service';

@Module({
  imports: [HttpModule],
  controllers: [CountryController],
  providers: [CountryService, ApiConfigService],
  exports: [CountryService],
})
export class CountryModule {}
