import { Oauth2Provider } from './constants';

/**
 * Oauth2Profile is a generic oauth2 profile data structure, all oauth2
 * provider profiles will be converted into this structure.
 *
 * @export
 * @interface Oauth2Profile
 */
export interface Oauth2Profile {
  /**
   * providerId is unique identifier of profile from provider.
   *
   * @type {number}
   * @memberof Oauth2Profile
   */
  profileId: number;

  /**
   * provider represents oauth2 provider.
   *
   * @type {Oauth2Provider}
   * @memberof Oauth2Profile
   */
  provider: Oauth2Provider;

  /**
   * displayName is the display name from oauth2 profile.
   *
   * @type {string}
   * @memberof Oauth2Profile
   */
  displayName: string;

  /**
   * username is username from oauth2 profile.
   *
   * @type {string}
   * @memberof Oauth2Profile
   */
  username: string;

  /**
   * profileUrl is url of oauth2 profile.
   *
   * @type {string}
   * @memberof Oauth2Profile
   */
  profileUrl: string;

  /**
   * email is email of oauth2 profile.
   *
   * @type {string}
   * @memberof Oauth2Profile
   */
  email?: string;

  /**
   * avatarUrl is url of avatar of oauth2 profile.
   *
   * @type {string}
   * @memberof Oauth2Profile
   */
  avatarUrl?: string;

  /**
   * firstName is first name of oauth2 profile.
   *
   * @type {string}
   * @memberof Oauth2Profile
   */
  firstName?: string;

  /**
   * lastName is last name of oauth2 profile.
   *
   * @type {string}
   * @memberof Oauth2Profile
   */
  lastName?: string;
}
