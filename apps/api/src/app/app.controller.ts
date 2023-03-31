import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import got from 'got';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('got')
  async getGot(@Res() res: Response) {
    const { data } = await got
      .post('https://httpbin.org/anything', {
        json: {
          hello: 'world',
        },
      })
      .json<{ data: unknown }>();
    res.status(200).send(data);
  }

  @Get('/health-check')
  healthCheck(@Res() res: Response) {
    res.status(200).send('OK');
  }
}
