import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../dto/order.dto';
import { Orders } from '../model/order.model';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { User } from 'src/common/decorator/user.decorator';
import { StatusDto } from '../dto/status.dto';

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

  @Patch(':id')
  @Roles(Role.Client)
  async update(
    @Param('id') id: string,
    @Body() dto: OrderDto,
    @User() user,
  ): Promise<Orders> {
    return await this.orderService.update(id, dto, user.id);
  }

  @Delete(':id')
  @Roles(Role.Client)
  async delete(@Param('id') id: string, @User() user): Promise<any> {
    return await this.orderService.delete(id, user.id);
  }

  @Patch(':id/status')
  @Roles(Role.Deliverer)
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: StatusDto,
  ): Promise<Orders> {
    return await this.orderService.updateStatus(id, dto);
  }
}
