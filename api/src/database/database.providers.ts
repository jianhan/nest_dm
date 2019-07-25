import * as mongoose from 'mongoose';
import { getConfigService } from '../config/config.service';

const configs = getConfigService();
const mongoHost = configs.get('MONGO_HOST');
const mongoDB = configs.get('MONGO_DB');
const mongoPort = configs.get('MONGO_PORT');

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDB}`, {
        useNewUrlParser: true,
      }),
  },
];
