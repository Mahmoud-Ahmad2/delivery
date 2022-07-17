import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../dto/order.dto';
import { Orders } from '../model/order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
}
