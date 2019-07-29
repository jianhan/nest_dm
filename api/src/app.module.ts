import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { authProviders } from './auth/auth.provider';

@Module({
  imports: [ConfigModule, AuthModule, UsersModule, DatabaseModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, ...authProviders],
})
export class AppModule {}
