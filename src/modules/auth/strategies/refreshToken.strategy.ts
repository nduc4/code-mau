import { User } from '@modules/user/dto/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtRefreshPayload } from '../dto/jwtPayload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.refreshToken,
      ]),
      secretOrKey: configService.get('secure.jwt'),
    });
  }

  async validate(payload: JwtRefreshPayload): Promise<User> {
    const userId = payload.sub;

    return this.userService.findOne({ where: { id: userId } });
  }
}
