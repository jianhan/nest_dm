import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @Length(6, 20)
  readonly password: string;
}
