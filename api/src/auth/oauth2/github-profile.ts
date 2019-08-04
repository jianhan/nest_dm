import {
  IsInt,
  IsString,
  IsUrl,
  IsArray,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

/**
 * ArrayValue represent the payload data structure received from github for values like email and photos.
 *
 * @export
 * @interface ArrayValue
 */
export interface ArrayValue {
  value: string;
}

/**
 * GithubProfile represent profile structure returned from github provider.
 *
 * @export
 * @class GithubProfile
 */
export class GithubProfile {
  /**
   * id represent id field of github profile payload.
   *
   * @type {number}
   * @memberof GithubProfile
   */
  @IsInt()
  @IsNotEmpty()
  id: number;

  /**
   * displayName is the display name in github profile payload.
   *
   * @type {string}
   * @memberof GithubProfile
   */
  @IsString()
  displayName: string;

  /**
   * username is github username.
   *
   * @type {string}
   * @memberof GithubProfile
   */
  @IsString()
  @IsNotEmpty()
  username: string;

  /**
   * profileUrl is github profile url.
   *
   * @type {string}
   * @memberof GithubProfile
   */
  @IsUrl()
  profileUrl: string;

  /**
   * photos is array contains list of photos from github profile.
   *
   * @type {ArrayValue[]}
   * @memberof GithubProfile
   */
  @IsArray()
  @ValidateIf(o => o.profile !== undefined)
  photos: ArrayValue[];

  /**
   * emails contains list of emails from github profile.
   *
   * @type {ArrayValue[]}
   * @memberof GithubProfile
   */
  @ValidateIf(o => o.emails !== undefined)
  @IsArray()
  emails: ArrayValue[];
}
