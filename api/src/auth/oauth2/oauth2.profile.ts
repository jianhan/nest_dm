import { Oauth2Payload } from './oauth2.payload';

export interface Oauth2Profile extends Oauth2Payload {
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  profileUrl: string;
  avatarUrl?: string;
}
