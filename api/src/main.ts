import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, getConfigService } from './config/config.service';

async function bootstrap(config: ConfigService) {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap(getConfigService());
