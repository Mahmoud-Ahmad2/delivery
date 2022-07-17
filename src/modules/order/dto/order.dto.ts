import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Order ID' })
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Order ID' })
  order: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true, description: 'Order ID' })
  quantity: number;
}
