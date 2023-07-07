import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/user.dto';

export class LoginDto extends OmitType(CreateUserDto, ['name'] as const) {}

export class LoginResDto {
  token: string;
  email: string;
  name: string;
}
