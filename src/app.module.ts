import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/module';
import { ApiModule } from '@application/api/module';

@Module({
  imports: [
    ApiModule,
    DomainModule,
  ],
})
export class AppModule { }
