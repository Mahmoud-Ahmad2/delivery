import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [UserModule, OrderModule],
  providers: [NotificationGateway],
})
export class NotificationModule {}
