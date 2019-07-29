import { GithubProfileConverter } from './oauth2';

export const authProviders = [
  {
    provide: 'GithubProfileConverter',
    useClass: GithubProfileConverter,
  },
];
