import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import * as human from 'humanparser';
import { Oauth2Profile } from './oauth2.profile';
import { Oauth2Provider } from './constants';
import { Oauth2Converter } from './oauth2.converter';
import { GithubProfile } from './github-profile';
import { validate, ValidationError } from 'class-validator';

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
      !_.has(this.profile, 'emails') ||
      (_.isArray(this.profile.emails) && _.size(this.profile.emails) > 0)
    );
  }

  public async convert(): Promise<Oauth2Profile | ValidationError[]> {
    const errors = await validate(this.profile);
    if (errors.length > 0) {
      return errors;
    }

    const nameObj = this.convertDisplayName();
    const oauth2Profile: Oauth2Profile = {
      firstName: nameObj ? nameObj.firstName : '',
      lastName: nameObj ? nameObj.lastName : '',
      email: this.hasEmails() ? this.profile.emails[0].value : null,
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
