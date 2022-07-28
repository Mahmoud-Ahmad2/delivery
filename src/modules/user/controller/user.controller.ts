import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignupUserDto } from '../dto/signupUser.dto';
import { LoginDto } from '../dto/login.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { Users } from '../model/user.model';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';

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
    return this.userService.login(dto);
  }

  @Get()
  @Roles(Role.Admin)
  getAll(): Promise<Users[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @Roles(Role.Admin)
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return this.userService.findOneByUserId(id);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  delete(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.userService.deleteUser(id);
  }
}
