import { Controller, Get, Query } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/list')
  getCountries() {
    return this.countryService.getCountryData();
  }

  @Get('/detail')
  getCountryDetail(@Query('name') name: string, @Query('code') code: string) {
    return this.countryService.getEspecificInfoDetails(name, code);
  }
}
