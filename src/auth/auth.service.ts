import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/users/entities/user.entity";
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, @InjectRedis() private readonly redis: Redis) {}

	// 生产token
	generateToken(user: User) {
		const { id, username } = user;
		return this.jwtService.sign({ id, username });
	}

	// 将token存入redis
	async setToken(user: User, token: string) {
    await this.redis.set(`token:${token}`, JSON.stringify(user));
  }

	// 替换token 调用接口的时候更新旧token时效
	async replaceToken(user: User, token: string) {
		await this.redis.del(`token:${token}`);
		await this.setToken(user, token);
	}

	// 校验token
	async getUserByToken(token: string) {
		return JSON.parse(await this.redis.get(`token:${token}`));
	}

}
