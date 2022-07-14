import { Users } from './model/user.model';
import { providersEnum } from '../../common/constant';

export const userProviders = [
  {
    provide: providersEnum.USER_PROVIDER,
    useValue: Users,
  },
];
