import { Body, Controller, Post, Get } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { User } from 'src/common/decorator/user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
}
