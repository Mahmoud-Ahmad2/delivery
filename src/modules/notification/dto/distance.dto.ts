import { IsNotEmpty, IsString, IsLatitude } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class DistanceDto {
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsLatitude()
  @IsNotEmpty()
  longitude: number;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
