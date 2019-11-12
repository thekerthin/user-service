import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { getPrototypes } from '@kerthin/utils';
import { HttpExceptionFilter } from './utils/catch';

const controllers = getPrototypes(`${__dirname}/controllers/*{.ts,.js}`);
const services = getPrototypes(`${__dirname}/services/*{.ts,.js}`);

const morganProvider = {
  provide: APP_INTERCEPTOR,
  useClass: MorganInterceptor('combined'),
};

const catchExceptions = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};

@Module({
  imports: [
    MorganModule.forRoot(),
  ],
  controllers: [
    ...controllers,
  ],
  providers: [
    ...services,
    morganProvider,
    catchExceptions,
  ],
})
export class ApiModule { }
