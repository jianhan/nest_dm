import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { USER_MODEL } from './constants';
import { SignupDto } from './dto/signup.dto';
import { Oauth2Profile } from '../auth/oauth2/oauth2.profile';
import { Oauth2Payload } from '../auth/oauth2/oauth2.payload';
import * as VError from 'verror';
import { sprintf } from 'sprintf-js';

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

  async signup(signupDto: SignupDto): Promise<User> {
    const currentUser = await this.findByEmail(signupDto.email);
    if (currentUser) {
      throw new BadRequestException(
        sprintf('user with email %s already exists', signupDto.email),
      );
    }

    const user = new this.userModel(signupDto);
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

  async upsertOauth2Profile(payload: Oauth2Profile): Promise<User | undefined> {
    const user = await this.userModel.findOneAndUpdate(
      { 'github.profileId': payload.profileId },
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        github: payload,
      },
      { upsert: true, new: true },
    );

    return user;
  }
}
