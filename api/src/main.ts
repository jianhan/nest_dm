import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, getConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(config: ConfigService) {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.get('APP_PORT'));
}
bootstrap(getConfigService());
