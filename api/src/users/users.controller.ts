import { Controller, Body, Post, UseFilters } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { MongoExceptionFilter } from '../exceptions/mongo-exception.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UseFilters(MongoExceptionFilter)
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.singup(signupDto);
  }
}
