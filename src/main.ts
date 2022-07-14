import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guard/auth.guard';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { Logger } from './common/logger';

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
  app.useGlobalGuards(
    new AuthGuard(new Reflector()),
    new RolesGuard(new Reflector()),
  );
  await app.listen(3000);
}
bootstrap();
