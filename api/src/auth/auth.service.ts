import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt.payload';
import { Oauth2Payload } from './oauth2/oauth2.payload';

/**
 * AuthService handles logics of authentication.
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService with dependency injections for users and jwt services.
   * @param {UsersService} usersService
   * @param {JwtService} jwtService
   * @memberof AuthService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * validateUser checks if attempted password and email combination is valid.
   *
   * @param {string} email
   * @param {string} attemptedPassword
   * @returns {Promise<any>}
   * @memberof AuthService
   */
  async validateUser(email: string, attemptedPassword: string): Promise<any> {
    // checks if user exists
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    // checks if password and attempted password match.
    const isMatched = await bcrypt.compare(attemptedPassword, user.password);
    if (!isMatched) {
      return null;
    }

    // construct result
    const { password, ...result } = user;

    return result;
  }

  /**
   * token generates signed JWT.
   *
   * @param {JwtPayload} payload
   * @returns
   * @memberof AuthService
   */
  async token(payload: JwtPayload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * tokenOauth2 generates token for oauth2 authentication.
   *
   * @param {Oauth2Payload} oauth2Payload
   * @returns {Promise<string>}
   * @memberof AuthService
   */
  async tokenOauth2(oauth2Payload: Oauth2Payload): Promise<string> {
    try {
      return this.jwtService.sign(oauth2Payload);
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
