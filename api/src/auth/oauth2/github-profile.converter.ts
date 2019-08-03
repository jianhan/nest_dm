import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import * as human from 'humanparser';
import { Oauth2Profile } from './oauth2.profile';
import { Oauth2Provider } from './constants';
import { Oauth2Converter } from './oauth2.converter';
import { GithubProfile } from './github-profile';
import { validate } from 'class-validator';
import * as VError from 'verror';

@Injectable()
export class GithubProfileConverter implements Oauth2Converter {
  private profile: GithubProfile;

  public setProfile(profile: GithubProfile): Oauth2Converter {
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

  private hasEmails(): boolean {
    return (
      _.has(this.profile, 'emails') &&
      _.isArray(this.profile.emails) &&
      _.size(this.profile.emails) > 0
    );
  }

  public async convert(): Promise<Oauth2Profile> {
    const errors = await validate(this.profile);
    if (errors.length > 0) {
      throw new VError(
        {
          name: 'InvalidUserProfile',
          info: {
            errors,
          },
        },
        'invalid user profile, unable to process request',
      );
    }

    const oauth2Profile: Oauth2Profile = {
      profileId: this.profile.id,
      provider: Oauth2Provider.GITHUB,
      displayName: this.profile.displayName,
      username: this.profile.username,
      profileUrl: this.profile.profileUrl,
    };

    const nameObj = this.convertDisplayName();
    if (nameObj) {
      oauth2Profile.firstName = nameObj.firstName;
      oauth2Profile.lastName = nameObj.lastName;
    }

    if (this.hasEmails()) {
      oauth2Profile.email = this.profile.emails[0].value;
    }

    if (this.hasPhotos()) {
      oauth2Profile.avatarUrl = this.profile.photos[0].value;
    }

    return oauth2Profile;
  }
}
