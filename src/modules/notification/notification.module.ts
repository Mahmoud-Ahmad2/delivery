import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [UserModule, OrderModule],
  providers: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
