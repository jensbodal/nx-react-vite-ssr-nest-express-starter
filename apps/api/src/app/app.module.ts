import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VpsModule } from './vite-plugin-ssr.module';

@Module({
  imports: [VpsModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
