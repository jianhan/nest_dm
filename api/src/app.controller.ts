import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
// import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('test')
  getTest(@Request() req) {
    return this.config.get('TEST');
  }
}
