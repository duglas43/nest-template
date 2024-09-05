import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppFilter } from './app.filter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppFilter,
    },
  ],
})
export class ExceptionFiltersModule {}
