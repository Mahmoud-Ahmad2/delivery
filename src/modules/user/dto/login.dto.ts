import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { REGEX_PASSWORD } from '../../../common/constant';

export class LoginDto {
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  inEmail: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  inUsername: string;

  @IsNotEmpty()
  @Matches(REGEX_PASSWORD)
  inPassword: string;
}
