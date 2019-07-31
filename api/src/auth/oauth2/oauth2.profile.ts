import { Oauth2Provider } from './constants';

export interface Oauth2Profile {
  email?: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  profileId: number;
  provider: Oauth2Provider;
  displayName: string;
  username: string;
  profileUrl: string;
}
