import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getConfigService } from './config/config.service';

const configs = getConfigService();
const mongoHost = configs.get('MONGO_HOST');
const mongoDB = configs.get('MONGO_DB');
const mongoPort = configs.get('MONGO_PORT');

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule,
    MongooseModule.forRoot(`mongodb://${mongoHost}:${mongoPort}/${mongoDB}`, {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
