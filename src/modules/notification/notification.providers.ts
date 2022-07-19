import { Notifications } from './model/notification.model';
import { providersEnum } from '../../common/constant';

export const notificationProviders = [
  {
    provide: providersEnum.NOTIFICATION_PROVIDER,
    useValue: Notifications,
  },
];
