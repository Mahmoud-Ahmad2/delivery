import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { AppGateway } from './app.gatway';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    DatabaseModule,
    UserModule,
    OrderModule,
    NotificationModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
