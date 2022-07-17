import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Orders } from '../model/order.model';
import { providersEnum } from '../../../common/constant';
import { LoginDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(providersEnum.ORDER_PROVIDER)
    private readonly orderRepository: typeof Orders,
  ) {}
}
