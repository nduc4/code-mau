import { User } from '@modules/user/dto/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { JwtPayload } from './dto/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async loginAccount(data: LoginDto) {
    let user: User;
    const { email, password } = data;

    try {
      user = await this.userService.findOne({
        where: { email },
      });
    } catch (err) {
      throw new UnauthorizedException(`There isn't any user`);
    }

    if (!password && password === '') {
      throw new UnauthorizedException(`Password should not be empty`);
    }

    if (!(await user.checkPassword(password as string))) {
      throw new UnauthorizedException(`Wrong password`);
    }

    delete user.password;
    return {
      accessToken: this.createAccessToken(user.email),
      refreshToken: this.createRefreshToken(user.id),
      user,
    };
  }

  createAccessToken(email: string) {
    return this.jwtService.sign({ email }, { expiresIn: '2m' });
  }

  createRefreshToken(userId: string) {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '1h' });
  }

  signToken(user: User): string {
    const payload = {
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({
        where: { email: payload.email },
      });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.email}`,
      );
    }
    delete user.password;

    return user;
  }
}
