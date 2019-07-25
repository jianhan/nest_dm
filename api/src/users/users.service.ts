import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
