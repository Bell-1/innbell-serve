// users.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions, Like } from "typeorm";
import { User } from "./entities/user.entity";
import { queryPageDto, QueryPageResultDto } from "@/common/dto/query";

import { ERROR_CODE } from "@/utils/response";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async registerUser({ username, password}: CreateUserDto): Promise<User> {
		// 先判断用户名是否存在
		const existingUser = await this.findUserByUsername(username);
		if (existingUser) {
			throw ERROR_CODE.USERNAME_EXIST;
		}
		// 创建用户
		const user = this.userRepository.create({ username, password });
		this.userRepository.save(user);
		console.log(user)

		// 返回新增的数据库记录
		// 查询用户信息
    const registeredUser = await this.findUserById(user.id);
		console.log(registeredUser, 'registeredUser')

    if (!registeredUser) {
      throw new Error('Failed to register user');
    }

		delete user.password;
		return user;
	}

	// 根据用户名查找用户
	async findUserByUsername(username: string): Promise<User | undefined> {
		const options: FindOneOptions<User> = { where: { username } };
		return this.userRepository.findOne(options);
	}

	// 根据id查找用户
	async findUserById(id: number): Promise<User | undefined> {
		const options: FindOneOptions<User> = { where: { id } };
		return this.userRepository.findOne(options);
	}
	

	// 查找所有用户
	async findUsers(options: queryPageDto): Promise<QueryPageResultDto<User>> {
		// 分页查询
		const { page = 1, limit = 10, keyword } = options;
		const offset = (page - 1) * limit;

		// 参数校验
		const queryBuilder = this.userRepository.createQueryBuilder("user");

		// 关键字查询
		if (keyword) {
			queryBuilder.where(
				`user.username LIKE :keyword OR user.phone LIKE :keyword OR user.email LIKE :keyword`,
				{ keyword: `%${keyword}%` }
			);
		}

		// 查询总条数
    const total = await queryBuilder.getCount();

		// 分页查询
		const users = await queryBuilder
			.skip(offset)
			.take(limit)
			.getMany();

		users.forEach((user) => {
			delete user.password;
		});

		return { list: users, total, page, limit };
	}

	deleteUser(user: User) {
		return this.userRepository.remove(user);
	}

	updateUser(user: UpdateUserDto) {
		return this.userRepository.save(user);
	}
	
}
