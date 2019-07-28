import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { USER_MODEL } from './constants';
import { SignupDto } from './dto/signup.dto';
import { Oauth2Payload, Oauth2Profile } from '../auth/oauth2';

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

  async findByProviderAndProfile(
    payload: Oauth2Payload,
  ): Promise<User | undefined> {
    const user = await this.userModel.findOne({
      'github.profileId': payload.profileId,
    });

    return user;
  }

  async updateByProviderAndProfile(
    payload: Oauth2Profile,
  ): Promise<User | undefined> {
    const user = await this.userModel.findOneAndUpdate(
      { 'github.profileId': payload.profileId },
      { $set: { github: payload } },
      { new: true },
    );
    return user;
  }

  async upsertByOauth2Profile(
    payload: Oauth2Profile,
  ): Promise<User | undefined> {
    const user = await this.userModel.findOneAndUpdate(
      { 'github.profileId': payload.profileId },
      {
        firstName: 'test',
        lastName: 'test',
        email: payload.email,
        github: payload,
      },
      { upsert: true, new: true },
    );

    return user;
  }
}
