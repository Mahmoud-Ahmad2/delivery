import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Orders } from '../model/order.model';
import { OrderDto } from '../dto/order.dto';
import { Logger } from '../../../common/logger';
import { OrderCreatedEvent } from '../../../common/events/order-created.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StatusDto } from '../dto/status.dto';
import { ERRORS, EVENTS, providersEnum } from '../../../common/constant';

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
    const { latitude, longitude, order, quantity } = dto;
    this.logger.log(`User ${id} created order ${order}`);
    const orderCreated = new OrderCreatedEvent();
    orderCreated.latitude = latitude;
    orderCreated.longitude = longitude;
    orderCreated.order = order;
    orderCreated.quantity = quantity;
    orderCreated.userId = id;
    orderCreated.status = 'IN_PROGRESS';
    this.eventEmitter.emit(EVENTS.ORDER_CREATED, orderCreated);
    return await this.orderRepository.create({
      userId: id,
      latitude,
      longitude,
      order,
      quantity,
    });
  }

  async findAll(): Promise<Orders[]> {
    this.logger.log('Find all orders by admin');
    return await this.orderRepository.findAll();
  }

  async findOne(id: string, userId: string): Promise<Orders> {
    this.logger.log(`Find order ${id} , user ${userId}`);
    return await this.orderRepository.findOne({ where: { id, userId } });
  }

  async update(id: string, dto: OrderDto, userId: string): Promise<any> {
    this.logger.log(`Update order ${id} , user ${userId}`);
    const { status } = await this.orderRepository.findOne({
      where: { id, userId },
    });
    if (status === 'OnWay' || status === 'Arrived' || status === 'Completed') {
      throw new HttpException(
        ERRORS.YOU_CAN_NOT_UPDATE_THE_ORDER,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.orderRepository.update(dto, { where: { id, userId } });
  }

  async delete(id: string, userId: string): Promise<any> {
    this.logger.log(`Delete order ${id} , user ${userId}`);
    return await this.orderRepository.destroy({ where: { id, userId } });
  }

  async updateStatus(id: string, dto: StatusDto): Promise<any> {
    this.logger.log(`Update status order ${id} `);
    return await this.orderRepository.update(dto, { where: { id } });
  }

  async findOneById(id: string): Promise<Orders> {
    this.logger.log(`Find order ${id}`);
    return await this.orderRepository.findOne({ where: { id } });
  }
}
