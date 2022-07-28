import { IsEmail, Matches, IsString, IsNotEmpty, IsIn } from 'class-validator';
import { REGEX_PASSWORD } from '../../../common/constant';
import { Transform, TransformFnParams } from 'class-transformer';

export class SignupUserDto {
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(REGEX_PASSWORD)
  @IsNotEmpty()
  password: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  middleName: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  @IsIn(['ADMIN', 'CLIENT', 'DELIVERER'])
  role: string;
}
