import { IsNotEmpty, IsIn, IsString } from 'class-validator';

export class StatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['ON_WAY', 'ARRIVED', 'COMPLETED'])
  status: string;
}
