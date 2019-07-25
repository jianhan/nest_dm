import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { USER_MODEL } from './constants';
import { DATABASE_CONNECTION } from '../database/constants';

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model('Cat', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
