import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "127.0.0.1",
        "port": 3306,
        "username": "root",
        "password": "zaq1ZAQ!",
        "database": "innbell",
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true,
        "logging": true
      }
    ), // 加载数据库配置
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [
    AppController, // 加载根控制器
  ],
  providers: [
    AppService, // 加载根服务
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/register', method: RequestMethod.POST },
        { path: 'users/one/:id', method: RequestMethod.DELETE },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*')
  }
}
