import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.userModel.findOne({ email });
    return user;
  }
}
