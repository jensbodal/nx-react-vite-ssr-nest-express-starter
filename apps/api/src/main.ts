import { Logger, RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { Express } from "express";
import { IncomingMessage, ServerResponse } from "node:http";

import { AppModule } from './app/app.module';

let resolveHandler: (value: Express) => void;
let expressHandler: Express | Promise<Express> = new Promise((resolve) => {
	resolveHandler = resolve;
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // https://docs.nestjs.com/faq/global-prefix
  const globalPrefix = 'api';

  // this exclude isn't necessary it seems like
  app.setGlobalPrefix(globalPrefix, {
    exclude: ['cats', { path: 'ssr', method: RequestMethod.ALL }],
  });

  const port = process.env.PORT || 3333;

  if (import.meta.env?.PROD) {
    // For production, start your server
    // as you would normally do.
    await app.listen(port);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  } else {
    await app.init();
    resolveHandler(await app.getHttpAdapter().getInstance());
  }
}

bootstrap();

export default async function handler(
	request: IncomingMessage,
	reply: ServerResponse,
) {
	if (expressHandler instanceof Promise) {
		expressHandler = await expressHandler;
	}

	expressHandler(request, reply);
}
