import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * UserLoginDto is data transfer object for use authentication.
 *
 * @export
 * @class UserLoginDto
 */
export class UserLoginDto {
  /**
   * email must be presented and must be a valid email address.
   *
   * @type {string}
   * @memberof UserLoginDto
   */
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  /**
   * password must not be empty.
   *
   * @type {string}
   * @memberof UserLoginDto
   */
  @IsNotEmpty()
  readonly password: string;
}
