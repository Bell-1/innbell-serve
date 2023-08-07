import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 添加全局前缀
  app.setGlobalPrefix('api');

  // 添加全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
