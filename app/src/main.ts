import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ALLOW_HOST, PORT } from './configs';
import { TimeoutInterceptor } from '@/helpers/interceptors/timeout.interceptor';
import { HttpExceptionFilter } from '@/helpers/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set Cors
  app.enableCors({
    origin: ALLOW_HOST,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Setup Swagger
  const options = new DocumentBuilder()
    .setTitle('Backend API SWagger')
    .setDescription('This is a detail specification of API Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-swagger', app, document);

  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
