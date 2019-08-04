import { Oauth2Profile } from './oauth2.profile';

/**
 * Oauth2Converter defines interface for any implementation of oauth2 authentication.
 *
 * @export
 * @interface Oauth2Converter
 */
export interface Oauth2Converter {
  /**
   * convert is the function perform main logic for conversion.
   *
   * @returns {Promise<Oauth2Profile>}
   * @memberof Oauth2Converter
   */
  convert(): Promise<Oauth2Profile>;

  /**
   * setProfile is setter for profile.
   *
   * @param {*} profile
   * @returns {Oauth2Converter}
   * @memberof Oauth2Converter
   */
  setProfile(profile: any): Oauth2Converter;
}
