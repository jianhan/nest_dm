import { GithubProfileConverter } from './github-profile.converter';
import { GithubProfile } from './github-profile';
import { ValidationError } from '@nestjs/common';
import { Oauth2Profile } from './oauth2.profile';
import * as VError from 'verror';
let githubProfileConverter: GithubProfileConverter = null;
let githubProfile: GithubProfile = null;

// setup
beforeEach(() => {
  githubProfileConverter = new GithubProfileConverter();
  githubProfile = new GithubProfile();
  githubProfile.id = 1;
  githubProfile.displayName = 'John Test Smith';
  githubProfile.username = 'john-test-smith';
  githubProfile.profileUrl = 'http://john-profile.com';
  githubProfile.emails = [{ value: 'john.test.smith@mail.com' }];
  githubProfile.photos = [{ value: 'http://www.photos.com/test.png' }];
});

// tear down
afterEach(() => {
  githubProfileConverter = null;
  githubProfile = null;
});

describe('github profile converter', () => {
  test('successful with all values', async () => {
    githubProfileConverter.setProfile(githubProfile);
    const user: Oauth2Profile = await githubProfileConverter.convert();
    expect(user.displayName).toBe(githubProfile.displayName);
    expect(user.email).toBe(githubProfile.emails[0].value);
    expect(user.profileId).toBe(githubProfile.id);
    expect(user.profileUrl).toBe(githubProfile.profileUrl);
    expect(user.avatarUrl).toBe(githubProfile.photos[0].value);
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Smith');
  });

  test('successful with missing emails', async () => {
    delete githubProfile.emails;
    githubProfileConverter.setProfile(githubProfile);
    const profile: Oauth2Profile = (await githubProfileConverter.convert()) as Oauth2Profile;
    expect(profile.profileId).toBe(githubProfile.id);
    expect(profile.profileUrl).toBe(githubProfile.profileUrl);
    expect(profile.email).toBe(undefined);
  });

  test('fail with missing id', async () => {
    delete githubProfile.id;
    githubProfileConverter.setProfile(githubProfile);
    await expect(githubProfileConverter.convert()).rejects.toThrowError(
      'invalid user profile, unable to process request',
    );
  });
});
