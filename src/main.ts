import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

const port = process.env.PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['debug','error', 'log', 'verbose', 'warn']
  });
  app.enableCors();
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Distance Locator')
    .setDescription('REST API sercices calculating distance between two locations and storing location details')
    .setVersion('1.0')
    .addTag("distance-locator")
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  Logger.log(`Server started on http://localhost:${port}, Boostrap`);

}
bootstrap();
