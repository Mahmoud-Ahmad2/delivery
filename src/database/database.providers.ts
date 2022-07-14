import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { DATABASE_PROVIDE, DATABASE_CONFIG } from '../common/constant';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(DATABASE_CONFIG),
      });
      sequelize.addModels([]);
      return sequelize;
    },
  },
];
