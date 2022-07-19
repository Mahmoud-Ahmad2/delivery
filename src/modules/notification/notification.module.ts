import { Module } from '@nestjs/common';
import { NotificationService } from './service/notification.service';
import { NotificationController } from './controller/notification.controller';
import { notificationProviders } from './notification.providers';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, ...notificationProviders],
  exports: [NotificationService],
})
export class NotificationModule {}
