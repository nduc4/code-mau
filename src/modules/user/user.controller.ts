import { UseAuth } from '@decorators/auth.decorator';
import { ResponseMessage } from '@decorators/responseMessage.decorator';
import { AuthUser } from '@decorators/user.decorator';
import { JwtAuthGuard } from '@guard/jwt.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ResponseMessage('Create user success')
  async createUser(@Body() body: CreateUserDto) {
    await this.userService.create({ ...body });
    return;
  }

  @Get('/guard')
  @UseAuth()
  secure(@AuthUser() user) {
    return '123';
  }
}
