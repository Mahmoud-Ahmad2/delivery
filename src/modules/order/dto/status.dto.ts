import { IsNotEmpty, IsIn, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class StatusDto {
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  @IsIn(['ON_WAY', 'ARRIVED', 'COMPLETED'])
  status: string;
}
