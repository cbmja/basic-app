import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user-test')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  testUser(@Req() req: Request) {
    console.log(req.user);
    // @ts-ignore
    return `테스트 완료: ${req.user.email}`;
  }
}
