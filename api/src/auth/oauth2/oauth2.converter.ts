import { Oauth2Profile } from './oauth2.profile';

export interface Oauth2Converter {
  convert(): Oauth2Profile;
  setProfile(profile: any): Oauth2Converter;
}
