import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from './common/logger';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  //send message to all clients
  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized socket.io');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): void {
    this.wss.emit('message', message);
  }

  @SubscribeMessage('send-to-client')
  sendToClient(client: Socket, data: string): WsResponse<string> {
    return { event: 'message', data };
  }

  //send message to all Deliverer clients
  @SubscribeMessage('send-to-deliverer')
  sendToDeliverer(client: Socket, data: string): WsResponse<string> {
    return { event: 'message', data };
  }
}
