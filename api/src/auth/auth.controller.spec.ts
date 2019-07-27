import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from '../users/users.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { usersProviders } from '../users/users.provider';
import { jwtConstants } from './constants';

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService, ...usersProviders],
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '600s' },
        }),
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', async () => {
    it('should return an array of cats', async () => {
      const result = { access_token: 'testToken' };
      jest
        .spyOn(authService, 'login')
        .mockImplementation(async (user: any) => result);
      expect(await authController.login(new UserLoginDto())).toBe(result);
    });
  });
});
