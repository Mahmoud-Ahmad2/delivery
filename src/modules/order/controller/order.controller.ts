import { Body, Controller, Post, Get } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../dto/order.dto';
import { Orders } from '../model/order.model';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { User } from 'src/common/decorator/user.decorator';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.Client)
  async create(@Body() dto: OrderDto, @User() user): Promise<Orders> {
    return await this.orderService.create(dto, user);
  }

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<Orders[]> {
    return await this.orderService.findAll();
  }
}
