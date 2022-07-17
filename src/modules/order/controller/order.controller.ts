import { Body, Controller, Post, Get } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../dto/order.dto';
import { Orders } from '../model/order.model';
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
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.Client)
  @ApiOperation({ summary: 'Create order' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        id: 1,
        userId: 2,
        location: 'mahmoud',
        order: 'aA!1',
        quantity: 1,
        updatedAt: '2022-07-17T09:45:15.642Z',
        createdAt: '2022-07-17T09:45:15.642Z',
      },
    },
  })
  async create(@Body() dto: OrderDto, @User() user): Promise<Orders> {
    return await this.orderService.create(dto, user);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get order' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      example: [
        {
          id: 1,
          userId: 2,
          delivererId: null,
          location: 'mahmoud',
          order: 'aA!1',
          quantity: 1,
          status: 'IN_PROGRESS',
          deletedBy: null,
          updatedBy: null,
          createdAt: '2022-07-17T09:45:15.000Z',
          updatedAt: '2022-07-17T09:45:15.000Z',
          deletedAt: null,
          deliveredAt: null,
        },
      ],
    },
  })
  async findAll(): Promise<Orders[]> {
    return await this.orderService.findAll();
  }

  // @Get('/:id')
  // @Roles(Role.Admin)
}
