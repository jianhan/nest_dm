import { Oauth2Provider } from './constants';

/**
 * Oauth2Payload defines data structure to sign JWT token
 * for oauth2 authentication.
 *
 * @export
 * @interface Oauth2Payload
 */
export interface Oauth2Payload {
  /**
   * email contains email from any oauth2 provider.
   *
   * @type {string}
   * @memberof Oauth2Payload
   */
  email: string;

  /**
   * profileId is unique identifier from different oauth2 providers.
   *
   * @type {number}
   * @memberof Oauth2Payload
   */
  profileId: number;

  /**
   * provider represents oauth2 providers such as google plus, github, etc..
   *
   * @type {Oauth2Provider}
   * @memberof Oauth2Payload
   */
  provider: Oauth2Provider;
}
