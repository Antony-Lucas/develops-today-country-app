import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  getCountryApiUrl(): string {
    return this.configService.get<string>('COUNTRY_API_URL');
  }

  getBorderedCountryApiUrl(): string {
    return this.configService.get<string>('BORDERED_COUNTRY_API_URL');
  }

  getFlagCountryApiUrl(): string {
    return this.configService.get<string>('FLAG_COUNTRY_API_URL');
  }

  getPopulationCountryApiUrl(): string {
    return this.configService.get<string>('POPULATION_DATA_API_URL');
  }
}
