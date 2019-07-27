import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService, JwtPayload } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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
  constructor(private readonly authService: AuthService) {}

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
}
