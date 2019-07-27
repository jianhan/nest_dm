import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { ObjectId } from 'bson';

/**
 * JwtPayload represent data structure used for generating signed JWT.
 *
 * @export
 * @interface JwtPayload
 */
export interface JwtPayload {
  sub: ObjectId;
  email: string;
}

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
}
