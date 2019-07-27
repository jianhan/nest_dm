import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { getConfigService } from '../config/config.service';

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: getConfigService().get('JWT_SECRET'),
          signOptions: { expiresIn: '600s' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, LocalStrategy],
      controllers: [AuthController],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('login should return token', async () => {
    const result = { access_token: 'testToken' };
    jest
      .spyOn(authService, 'token')
      .mockImplementation(async (user: any) => result);
    expect(
      await authController.login({
        user: { email: 'test@gmail.com', _id: 'test id' },
      }),
    ).toBe(result);
  });
});
