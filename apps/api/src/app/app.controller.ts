import { Controller, Get, Res } from '@nestjs/common';
import {Response} from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/health-check')
  healthCheck(@Res() res: Response) {
    res.status(200).send('OK');
  }
}
