import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/users/entities/user.entity';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: AuthService);
    use(req: Request & {
        user: User;
    }, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
