import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignupUserDto } from '../dto/signupUser.dto';
import { LoginDto } from '../dto/login.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { Users } from '../model/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Public()
  insert(@Body() dto: SignupUserDto): Promise<Users> {
    return this.userService.signup(dto);
  }

  @Post('login')
  @Public()
  login(@Body() dto: LoginDto): Promise<object> {
    const { inEmail, inUsername, inPassword } = dto;
    return this.userService.login(inEmail, inUsername, inPassword);
  }
}
