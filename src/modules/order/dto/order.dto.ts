import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  order: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
