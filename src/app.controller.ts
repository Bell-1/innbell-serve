import { Controller, Get, Post, Req, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

class HelloDto {
  readonly name: string;
  readonly age: number;
}

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  

  @Get('hello')
  getHello(@Req() request: Request, @Query() query): string {
    return query;
  }

  @Post('hello')
  postHello(@Req() request: Request, @Body() helloDto: HelloDto): HelloDto {
    return helloDto;
  }
}
