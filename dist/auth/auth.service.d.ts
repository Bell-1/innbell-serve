import { JwtService } from "@nestjs/jwt";
import { User } from "@/users/entities/user.entity";
import { Redis } from '@nestjs-modules/ioredis';
export declare class AuthService {
    private readonly jwtService;
    private readonly redis;
    constructor(jwtService: JwtService, redis: Redis);
    generateToken(user: User): string;
    setToken(user: User, token: string): Promise<void>;
    replaceToken(user: User, token: string): Promise<void>;
    getUserByToken(token: string): Promise<any>;
}
