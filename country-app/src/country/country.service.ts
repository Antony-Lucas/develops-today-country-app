import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ApiConfigService } from 'src/config/api.config.service';
import { error } from 'console';

@Injectable()
export class CountryService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
  ) {}

  async getCountryData(): Promise<any> {
    const apiUrl = this.configService.getCountryApiUrl();
    try {
      const request: AxiosResponse = await lastValueFrom(
        this.httpService.get(apiUrl),
      );
      return request.data;
    } catch (error) {
      throw new HttpException('Error: ', HttpStatus.BAD_REQUEST);
    }
  }

  async getBorderedCountryData(code: string): Promise<any> {
    const apiUrl = this.configService.getBorderedCountryApiUrl();
    try {
      const request: AxiosResponse = await lastValueFrom(
        this.httpService.get(`${apiUrl}${code}`),
      );
      return request.data;
    } catch (error) {
      throw new HttpException('Error: ', HttpStatus.BAD_REQUEST);
    }
  }

  async getFlagCountryData(code: string): Promise<any> {
    const apiUrl = this.configService.getFlagCountryApiUrl();
    try {
      const request: AxiosResponse = await lastValueFrom(
        this.httpService.post(apiUrl, { iso2: code }),
      );
      return request.data;
    } catch (error) {
      throw new HttpException('Error: ', HttpStatus.BAD_REQUEST);
    }
  }

  async getPopulationData(countryName: string): Promise<any> {
    const apiUrl = this.configService.getPopulationCountryApiUrl();
    try {
      const request: AxiosResponse = await lastValueFrom(
        this.httpService.post(apiUrl, { country: countryName }),
      );
      return request.data;
    } catch (error) {
      throw new HttpException('Error: ', HttpStatus.BAD_REQUEST);
    }
  }

  async getEspecificInfoDetails(
    countryName: string,
    code: string,
  ): Promise<any> {
    try {
      const [countries, population, flag, borders] = await Promise.all([
        this.getCountryData(),
        this.getPopulationData(countryName),
        this.getFlagCountryData(code),
        this.getBorderedCountryData(code),
      ]);

      const countryDetails = await countries.find(
        (c: any) => c.name.toLowerCase() === countryName.toLowerCase(),
      );

      return {
        country: countryDetails,
        population: population.data,
        flag: flag.data.flag,
        borders: borders.borders,
      };
    } catch (error) {
      throw new HttpException(
        'Error: Fail to catch API data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
