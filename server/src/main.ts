import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(2020, () => {
    Logger.log('Server is running at http://localhost:2020 . Press Ctrl+C to stop.');
  });
}
bootstrap();
