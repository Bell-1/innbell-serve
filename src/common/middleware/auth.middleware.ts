import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/users/entities/user.entity';
import { ERROR_CODE } from '@/utils/response';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request & { user: User}, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    console.log('token', authorization, req.baseUrl)

    const notLoginReq = () => res.status(401).json(ERROR_CODE.NOT_LOGIN)

    if (!authorization) {
      return notLoginReq();
    }

    // 没有token直接返回
    const token = authorization.split(' ')[1];
    if (!token) {
      return notLoginReq();
    }

    // 校验token是否有效
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return notLoginReq();
    }

    req.user = user;
    
    next();
  }
}