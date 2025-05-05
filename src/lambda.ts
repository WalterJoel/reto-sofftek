import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('MULTIPLE API')
      .setDescription('API creada para un reto técnico')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('api', nestApp, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        defaultModelExpandDepth: 0,
        docExpansion: 'none', // No expandir las descripciones de los modelos
      },
    });

    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
