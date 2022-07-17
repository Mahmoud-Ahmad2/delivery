import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guard/auth.guard';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { Logger } from './common/logger';
import { UserService } from './modules/user/service/user.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
    new AuthGuard(new Reflector(), app.get(UserService)),
    new RolesGuard(new Reflector()),
  );

  const config = new DocumentBuilder()
    .setTitle('Delivery app')
    .setDescription('The Delivery API description')
    .setVersion('1.0')
    .addTag('delivery')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
