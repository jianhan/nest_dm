import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, getConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap(config: ConfigService) {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(helmet());
  // app.enableCors();
  // app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  await app.listen(config.get('APP_PORT'));
}
bootstrap(getConfigService());
