import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { REGEX_PASSWORD } from '../../../common/constant';

export class LoginDto {
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  inEmail: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  inUsername: string;

  @IsNotEmpty()
  @Matches(REGEX_PASSWORD)
  inPassword: string;
}
