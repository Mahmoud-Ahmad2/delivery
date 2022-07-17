import { IsEmail, Matches, IsString, IsNotEmpty, IsIn } from 'class-validator';
import { REGEX_PASSWORD } from '../../../common/constant';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Username' })
  username: string;

  @Matches(REGEX_PASSWORD)
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'First Name' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: false, description: 'Middle Name' })
  middleName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Last Name' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['ADMIN', 'CLIENT', 'DELIVERER'])
  @ApiProperty({ type: String, required: true, description: 'Role' })
  role: string;
}
