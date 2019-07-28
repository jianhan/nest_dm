import { Controller, Post, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from './jwt.payload';
import { UsersService } from '../users/users.service';
import { Oauth2Profile } from './oauth2';
import { Oauth2Provider } from './constants';

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
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req) {
    console.log(req.user.profile);
    const oauth2Profile: Oauth2Profile = {
      email: req.user.profile.emails[0].value,
      profileId: req.user.profile.id,
      provider: Oauth2Provider.GITHUB,
      displayName: req.user.profile.displayName,
      username: req.user.profile.username,
      profileUrl: req.user.profile.profileUrl,
      avatarUrl: 'test',
    };
    const newUser = await this.userService.upsertByOauth2Profile(oauth2Profile);
    console.log(newUser, '*****');
    const jwt: string = req.user.jwt;
    if (jwt) {
      return `<html><body><script>window.opener.postMessage('${jwt}', 'http://localhost:4200')</script></body></html>`;
    } else {
      return 'There was a problem signing in...';
    }
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
