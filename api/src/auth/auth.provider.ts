import { GithubProfileConverter } from './oauth2/github-profile.converter';

export const authProviders = [
  {
    provide: 'GithubProfileConverter',
    useClass: GithubProfileConverter,
  },
];
