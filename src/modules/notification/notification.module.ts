import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';
import { NotificationService } from './service/notification.service';

@Module({
  imports: [UserModule, OrderModule],
  providers: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
