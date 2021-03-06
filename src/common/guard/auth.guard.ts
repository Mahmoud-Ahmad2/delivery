import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyToken } from 'src/common/utils';
import { UserService } from 'src/modules/user/service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const isPublic = this.reflector.get<boolean>(
        process.env.IS_PUBLIC_KEY,
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }
      const { token } = request.headers;
      if (!token) {
        throw new UnauthorizedException();
      }

      const verify = verifyToken(token);
      const { id } = verify as any;

      if (id) {
        const user = await this.userService.findOneByUserId(id);
        request.user = user;
        return true;
      }

      return false;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
