import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignupUserDto } from '../dto/signupUser.dto';
import { LoginDto } from '../dto/login.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { Users } from '../model/user.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Public()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        id: 2,
        email: 'mahmoudd@gmail.com',
        password:
          '$2b$10$T4cJZomfhdKB4bL68iJQ8uqrOq4hVDycLkhqaF6Ms9upSEbx2rZf2',
        username: 'mahmoudd',
        firstName: 'mahmoud',
        middleName: 'ahmad',
        lastName: 'alhato',
        role: 'CLIENT',
        updatedAt: '2022-07-17T09:41:29.150Z',
        createdAt: '2022-07-17T09:41:29.150Z',
      },
    },
  })
  insert(@Body() dto: SignupUserDto): Promise<Users> {
    return this.userService.signup(dto);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'login user' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        data: {
          email: 'mahmoud@gmail.com',
          username: 'mahmoud',
          firstName: 'mahmoud',
          middleName: 'ahmad',
          lastName: 'alhato',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MDUwOTM5fQ.yIaCSdpbb7GBHvEX6K1I7V26PdQRPuR4InMQTHCdqpk',
      },
    },
  })
  login(@Body() dto: LoginDto): Promise<object> {
    return this.userService.login(dto);
  }
}
