import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { Oauth2Provider } from './constants';
import { Oauth2Payload } from './oauth2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.get('GITHUB_CLIENT_ID'),
      clientSecret: config.get('GITHUB_CLIENT_SECRET'),
      callbackURL: config.get('GITHUB_CALLBACK_URL'),
      passReqToCallback: true,
      scope: ['profile', 'user:email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: any,
  ) {
    try {
      const oauth2Payload: Oauth2Payload = {
        email: profile.emails[0].value,
        profileId: profile.id,
        provider: Oauth2Provider.GITHUB,
      };
      const jwt: string = await this.authService.tokenOauth2(oauth2Payload);
      const user = {
        jwt,
        profile,
      };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
