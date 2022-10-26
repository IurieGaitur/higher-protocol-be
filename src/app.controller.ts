import { Controller, Request, Get, Post, UseGuards, HttpException, HttpStatus, Body, Param, Res, UseInterceptors, UploadedFile, ClassSerializerInterceptor, Req, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './auth/auth.public';

@ApiTags('User')
@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('/alive')
  async isAlive() {
    return HttpStatus.OK;
  }

}
