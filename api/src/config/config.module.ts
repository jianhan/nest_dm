import { Module, Global } from '@nestjs/common';
import { ConfigService, getConfigService } from './config.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: getConfigService(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
