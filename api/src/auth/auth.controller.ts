import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Req,
  InternalServerErrorException,
  Inject,
  UseFilters,
} from '@nestjs/common';
import * as _ from 'lodash';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt.payload';
import { Oauth2Profile } from './oauth2/oauth2.profile';
import { GithubProfileConverter } from './oauth2/github-profile.converter';
import { InvalidProfileException } from './invalid-profile.exception';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';

/**
 * AuthController handles authentication related routes.
 *
 * @export
 * @class AuthController
 */
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @param {AuthService} authService
   * @memberof AuthController
   */
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    @Inject('GithubProfileConverter')
    private readonly githubProfileConverter: GithubProfileConverter,
  ) {}

  /**
   * login handles authentication with local strategy of passport.
   *
   * @param {UserLoginDto} userLoginDto
   * @returns
   * @memberof AuthController
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const payload: JwtPayload = {
      email: req.user.email,
      sub: req.user._id,
    };
    return this.authService.token(payload);
  }

  /**
   * githubLogin start oauth2 authentication via passport.
   *
   * @memberof AuthController
   */
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // passport will initialize oauth flow automatically
  }

  /**
   * githubLoginCallback handles callback from github oauth2 authentication.
   *
   * @param {*} req
   * @returns
   * @memberof AuthController
   */
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @UseFilters(HttpExceptionFilter)
  async githubLoginCallback(@Req() req) {
    if (!_.has(req, 'user.jwt')) {
      throw new InternalServerErrorException('Unable to generate token.');
    }

    if (!_.has(req, 'user.profile')) {
      throw new InternalServerErrorException('Unable to get profile.');
    }

    try {
      const profileResult: Oauth2Profile = await this.githubProfileConverter
        .setProfile(req.user.profile)
        .convert();
      await this.userService.upsertOauth2Profile(profileResult);
      const jwt: string = req.user.jwt;
      if (jwt) {
        return `<html><body><script>window.opener.postMessage('${jwt}', 'http://localhost:4200')</script></body></html>`;
      } else {
        return 'There was a problem signing in...';
      }
    } catch (e) {
      throw new InvalidProfileException(e.message);
    }
  }
}
