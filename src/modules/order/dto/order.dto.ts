import { IsNotEmpty, IsNumber, IsString, IsLatitude } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class OrderDto {
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsLatitude()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  order: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
