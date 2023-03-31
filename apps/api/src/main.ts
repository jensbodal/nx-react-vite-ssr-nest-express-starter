import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { Express } from "express";
import { IncomingMessage, ServerResponse } from "node:http";

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  if (import.meta.env.PROD) {
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

let resolveHandler: (value: Express) => void;
let expressHandler: Express | Promise<Express> = new Promise((resolve) => {
	resolveHandler = resolve;
});

export default async function handler(
	request: IncomingMessage,
	reply: ServerResponse,
) {
	if (expressHandler instanceof Promise) {
		expressHandler = await expressHandler;
	}

	expressHandler(request, reply);
}
