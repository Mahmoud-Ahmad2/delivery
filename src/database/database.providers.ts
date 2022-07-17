import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { DATABASE_PROVIDE, DATABASE_CONFIG } from '../common/constant';
import { Users } from '../modules/user/model/user.model';
import { Orders } from '../modules/order/model/order.model';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(DATABASE_CONFIG),
      });
      sequelize.addModels([Users, Orders]);
      return sequelize;
    },
  },
];
