import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Req,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import * as _ from 'lodash';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { Oauth2Profile, GithubProfileConverter, JwtPayload } from './oauth2';

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

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // passport will initialize oauth flow automatically
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req) {
    if (!_.has(req, 'user.jwt')) {
      throw new InternalServerErrorException('Unable to generate token.');
    }

    if (!_.has(req, 'user.profile')) {
      throw new InternalServerErrorException('Unable to get profile.');
    }

    const profile: Oauth2Profile = this.githubProfileConverter
      .setProfile(req.user.profile)
      .convert();

    const newUser = await this.userService.upsertOauth2Profile(profile);
    const jwt: string = req.user.jwt;
    if (jwt) {
      return `<html><body><script>window.opener.postMessage('${jwt}', 'http://localhost:4200')</script></body></html>`;
    } else {
      return 'There was a problem signing in...';
    }
  }
}
