import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { USER_MODEL } from './constants';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL)
    private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async singup(singupDto: SignupDto): Promise<User> {
    const user = new this.userModel(singupDto);
    return await user.save();
  }
}
