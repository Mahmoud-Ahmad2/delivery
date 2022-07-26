import { IsNotEmpty, IsString, IsLatitude } from 'class-validator';

export class DistanceDto {
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @IsLatitude()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  orderId: string;
}
