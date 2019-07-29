import { Oauth2Provider } from './constants';
import * as _ from 'lodash';
import { MissingProfileValueException } from './exceptions';
import { Injectable } from '@nestjs/common';
import * as human from 'humanparser';

/**
 * JwtPayload represent data structure used for generating signed JWT.
 *
 * @export
 * @interface JwtPayload
 */
export interface JwtPayload {
  sub: string;
  email: string;
}

export interface Oauth2Payload {
  email: string;
  profileId: number;
  provider: Oauth2Provider;
}

export interface Oauth2Profile extends Oauth2Payload {
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  profileUrl: string;
  avatarUrl?: string;
}

export interface Converter {
  convert(): Oauth2Profile;
  setProfile(profile: any): Converter;
}

@Injectable()
export class GithubProfileConverter implements Converter {
  private profile: any;

  public setProfile(profile: any): Converter {
    this.profile = profile;
    return this;
  }

  private convertDisplayName(): human.NameOutput | null {
    const displayName = _.get(this.profile, 'displayName', '');
    if (displayName) {
      return human.parseName(displayName);
    }

    return null;
  }

  private hasPhotos(): boolean {
    return (
      _.has(this.profile, 'photos') &&
      _.isArray(this.profile.photos) &&
      _.size(this.profile.photos) > 0
    );
  }

  private hasEmail(): boolean {
    return (
      !_.has(this.profile, 'emails') ||
      (_.isArray(this.profile.emails) && _.size(this.profile.emails) > 0)
    );
  }

  public convert(): Oauth2Profile {
    // check if email exists
    if (!this.hasEmail()) {
      throw new MissingProfileValueException(
        'Missing emails from user profile',
      );
    }

    const nameObj = this.convertDisplayName();
    const oauth2Profile: Oauth2Profile = {
      firstName: nameObj ? nameObj.firstName : '',
      lastName: nameObj ? nameObj.lastName : '',
      email: this.profile.emails[0].value,
      profileId: this.profile.id,
      provider: Oauth2Provider.GITHUB,
      displayName: this.profile.displayName,
      username: this.profile.username,
      profileUrl: this.profile.profileUrl,
      avatarUrl: this.hasPhotos() ? this.profile.photos[0].value : null,
    };

    return oauth2Profile;
  }
}
