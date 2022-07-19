import { Injectable, Inject } from '@nestjs/common';
import { Notifications } from '../model/notification.model';
import { providersEnum } from '../../../common/constant';
import { Logger } from '../../../common/logger';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(providersEnum.NOTIFICATION_PROVIDER)
    private readonly notificationRepository: typeof Notifications,
  ) {}
  private readonly logger = new Logger(NotificationService.name);
}
