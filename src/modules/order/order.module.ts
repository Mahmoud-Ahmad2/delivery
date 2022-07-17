import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { orderProviders } from './order.providers';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders],
  exports: [OrderService],
})
export class UserModule {}
