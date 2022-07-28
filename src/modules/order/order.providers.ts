import { Orders } from './model/order.model';
import { providersEnum } from '../../common/constant';

export const orderProviders = [
  {
    provide: providersEnum.ORDER_PROVIDER,
    useValue: Orders,
  },
];
