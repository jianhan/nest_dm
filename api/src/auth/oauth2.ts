import { Oauth2Provider } from './constants';

export interface Oauth2Payload {
  email: string;
  profileId: number;
  provider: Oauth2Provider;
}

export interface Oauth2Profile extends Oauth2Payload {
  displayName: string;
  username: string;
  profileUrl: string;
  avatarUrl: string;
}
