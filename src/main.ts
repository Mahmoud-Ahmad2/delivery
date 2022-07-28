import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guard/auth.guard';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { Logger } from './common/logger';
import { UserService } from './modules/user/service/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
  const userService = app.get(UserService);

  app.useGlobalGuards(
    new AuthGuard(new Reflector(), userService),
    new RolesGuard(new Reflector()),
  );

  await app.listen(3000);
}
bootstrap();
