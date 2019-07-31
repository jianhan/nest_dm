import { Oauth2Profile } from './oauth2.profile';
import { ValidationError } from 'class-validator';

export interface Oauth2Converter {
  convert(): Promise<Oauth2Profile | ValidationError[]>;
  setProfile(profile: any): Oauth2Converter;
}
