import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '../../common/logger';
import { Socket, Server } from 'socket.io';
import { UserService } from '../user/service/user.service';
import { verifyToken } from '../../common/utils';
import { OrderCreatedEvent } from 'src/common/events/order-created.event';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Role } from 'src/common/enum/role.enum';
import { GeneralEnum } from 'src/common/enum/general.enum';
import { OrderService } from '../order/service/order.service';
import { DistanceDto } from './dto/distance.dto';

@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2,
    private readonly orderService: OrderService,
  ) {}

  private readonly logger = new Logger(NotificationGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    this.logger.log('Initialized socket.io');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.token as string;

    if (!token) {
      this.logger.error('No token provided');
      client.disconnect(true);
      return;
    }

    const verify = verifyToken(token);
    const { id } = verify as any;
    const user = await this.userService.findOneByUserId(id);

    if (user.role === Role.Deliverer) {
      client.join(GeneralEnum.Room);
      this.logger.log(`Deliverer ${user.id} connected`);
      return;
    } else if (user.role === Role.Client) {
      client.join(GeneralEnum.Room + user.id);
      this.logger.log(`Client ${user.id} connected`);
      return;
    }

    this.logger.error('User is not a deliverer');
    client.disconnect(true);
  }

  handleDisconnect(client: Socket) {
    client.leave(GeneralEnum.Room);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @OnEvent('order.created')
  @SubscribeMessage('createOrder')
  async createOrder(@MessageBody() dto: OrderCreatedEvent) {
    this.server.to(GeneralEnum.Room).emit('createOrder', dto);
  }

  distanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    const r = 6371;

    return c * r;
  }

  @SubscribeMessage('getDistance')
  async getDistance(@MessageBody() dto: DistanceDto, client: Socket) {
    const { latitude, longitude, orderId } = dto;
    const order = await this.orderService.findOneById(orderId);

    const distance = this.distanceInKm(
      latitude,
      longitude,
      order.latitude,
      order.longitude,
    );

    if (distance < 1) {
      this.server.to(GeneralEnum.Room + order.userId).emit('getDistance', {
        message: 'You are in the range of the order',
      });
    }
  }
}
