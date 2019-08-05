import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { Oauth2Provider } from './oauth2/constants';
import { Oauth2Payload } from './oauth2/oauth2.payload';
import { GithubProfile } from './oauth2/github-profile';

/**
 * GithubStrategy process the logic of oauth2 authentication
 * for github provider.
 *
 * @export
 * @class GithubStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of GithubStrategy and resolve config and auth service dependencies.
   *
   * @param {ConfigService} config
   * @param {AuthService} authService
   * @memberof GithubStrategy
   */
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

  /**
   * validate validates and generates token for oauth2 authentication.
   *
   * @param {*} request
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {GithubProfile} profile
   * @param {*} done
   * @memberof GithubStrategy
   */
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile,
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
