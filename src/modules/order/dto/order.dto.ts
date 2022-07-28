import { IsNotEmpty, IsNumber, IsString, IsLatitude } from 'class-validator';

export class OrderDto {
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @IsLatitude()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  order: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
