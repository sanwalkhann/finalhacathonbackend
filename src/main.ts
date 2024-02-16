// main.ts or app.module.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3001'], // or specify your frontend URL(s) here
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // or specify the methods you need
    allowedHeaders: ['Content-Type', 'Authorization'], // or specify the headers you need
  };

  // Enable CORS with options
  app.enableCors(corsOptions);


  const config = new DocumentBuilder()
  .setTitle("Contact Crud in nestjs")
  .setDescription("Api Description")
  .setVersion('1.0')
  .addTag('api')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document, {
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  ],
});

  await app.listen(3000);
}
bootstrap();
