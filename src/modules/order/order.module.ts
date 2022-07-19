import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { orderProviders } from './order.providers';
import { OrderCreatedListener } from '../../common/listeners/order-created.listener';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders, OrderCreatedListener],
  exports: [OrderService],
})
export class OrderModule {}
