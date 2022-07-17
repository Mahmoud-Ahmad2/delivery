import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    OrderModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
