import { IsEmail, Matches, IsString, IsNotEmpty, IsIn } from 'class-validator';
import { REGEX_PASSWORD } from '../../../common/constant';

export class SignupUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(REGEX_PASSWORD)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  middleName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['ADMIN', 'CLIENT', 'DELIVERER'])
  role: string;
}
