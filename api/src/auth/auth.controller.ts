import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}
