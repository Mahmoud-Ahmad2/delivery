import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Orders } from '../model/order.model';
import { providersEnum } from '../../../common/constant';
import { OrderDto } from '../dto/order.dto';
import { Logger } from '../../../common/logger';
import { OrderCreatedEvent } from '../../../common/events/order-created.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {
  constructor(
    @Inject(providersEnum.ORDER_PROVIDER)
    private readonly orderRepository: typeof Orders,
    private eventEmitter: EventEmitter2,
  ) {}
  private readonly logger = new Logger(OrderService.name);
  async create(dto: OrderDto, user: object): Promise<Orders> {
    const { id }: { id?: number } = user;
    const { location, order, quantity } = dto;
    this.logger.log(`User ${id} created order ${order}`);
    const orderCreated = new OrderCreatedEvent();
    orderCreated.location = location;
    orderCreated.order = order;
    orderCreated.quantity = quantity;
    orderCreated.userId = id;
    orderCreated.status = 'IN_PROGRESS';
    this.eventEmitter.emit('order.created', orderCreated);
    return await this.orderRepository.create({
      userId: id,
      location,
      order,
      quantity,
    });
  }

  async findAll(): Promise<Orders[]> {
    this.logger.log('Find all orders by admin');
    return await this.orderRepository.findAll();
  }
}
