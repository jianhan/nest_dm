import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import * as human from 'humanparser';
import { MissingProfileValueException } from '../exceptions';
import { Oauth2Profile } from './oauth2.profile';
import { Oauth2Provider } from './constants';
import { Oauth2Converter } from './oauth2.converter';

@Injectable()
export class GithubProfileConverter implements Oauth2Converter {
  private profile: any;

  public setProfile(profile: any): Oauth2Converter {
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
