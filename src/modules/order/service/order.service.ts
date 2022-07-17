import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Orders } from '../model/order.model';
import { providersEnum } from '../../../common/constant';
import { OrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(providersEnum.ORDER_PROVIDER)
    private readonly orderRepository: typeof Orders,
  ) {}

  async create(dto: OrderDto, user: object): Promise<Orders> {
    const { id }: { id?: number } = user;
    const { location, order, quantity } = dto;
    return await this.orderRepository.create({
      userId: id,
      location,
      order,
      quantity,
    });
  }

  async findAll(): Promise<Orders[]> {
    return await this.orderRepository.findAll();
  }
}
