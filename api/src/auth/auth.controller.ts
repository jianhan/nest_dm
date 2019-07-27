import { Controller, Post, Body, UseGuards, Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
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
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}
