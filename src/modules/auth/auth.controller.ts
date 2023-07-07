import { ResponseMessage } from '@decorators/responseMessage.decorator';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ResponseMessage('Login success')
  async login(@Body() body: LoginDto, @Request() req) {
    const { accessToken, refreshToken } = await this.authService.loginAccount(
      body,
    );

    req.res.cookie('refreshToken', refreshToken, { httpOnly: true });
    return { accessToken, refreshToken };
  }

  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Post('refresh-token')
  async refreshToken(@Request() req) {
    const { user } = req;
    const accessToken = this.authService.createAccessToken(user.email);
    return { accessToken };
  }
}
