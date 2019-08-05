import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Oauth2Payload } from './oauth2/oauth2.payload';
import { JwtPayload } from './jwt.payload';

/**
 * JwtStrategy is passport JWT strategy.
 *
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  /**
   * validate returns jwt payload.
   *
   * @param {(JwtPayload | Oauth2Payload)} payload
   * @returns
   * @memberof JwtStrategy
   */
  async validate(payload: JwtPayload | Oauth2Payload) {
    return payload;
  }
}
