import { setupAuth } from '@addon/auth';
import { setupSwagger } from '@addon/swagger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './middlewares/badRequest.filter';
import { InternalServerException } from './middlewares/internalServerException.filter';
import { ValidationPipe } from './middlewares/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new InternalServerException(),
    new BadRequestExceptionFilter(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  setupSwagger(app);
  setupAuth(app);

  await app.listen(port);
  console.log(`Server is running on port: ${port}`);
}
bootstrap();
