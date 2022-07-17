import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { REGEX_PASSWORD } from '../../../common/constant';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: false, description: 'Email' })
  inEmail: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: false, description: 'Username' })
  inUsername: string;

  @IsNotEmpty()
  @Matches(REGEX_PASSWORD)
  @ApiProperty({ type: String, required: true, description: 'Password' })
  inPassword: string;
}
