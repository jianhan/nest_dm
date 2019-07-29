import { Oauth2Provider } from './constants';

export interface Oauth2Payload {
  email: string;
  profileId: number;
  provider: Oauth2Provider;
}
