// users.controller.ts
import { Controller, Get, Post, Delete, Param, Body, Req, Res, HttpCode, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthService } from "@/auth/auth.service";
import { User } from "./entities/user.entity";
import { ERROR_CODE, SUCCESS_CODE, ResponseType } from "@/utils/response";
import { queryUsersDto } from "./dto/query-users.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

	@Post("register")
	@HttpCode(200)
	async registerUser(@Body() registerUserDto: CreateUserDto): Promise<ResponseType<User>> {
		try {
			// 如果两次为空，返回错误
			if (!registerUserDto.username) {
				return ERROR_CODE.USERNAME_EMPTY;
			}

			if(!registerUserDto.password) {
				return ERROR_CODE.PASSWORD_EMPTY;
			}

			const user = await this.usersService.registerUser(registerUserDto);
			return SUCCESS_CODE(user);
		} catch (error) {
			return error;
		}
	}

	@Delete('one/:id')
	@HttpCode(200)
	async deleteUser(@Param('id') id: number, @Res() res): Promise<ResponseType> {
		try {
			const user = await this.usersService.findUserById(id);
			if(!user) return ERROR_CODE.USER_NOT_EXIST;
			await this.usersService.deleteUser(user);
			return res.status(200).SUCCESS_CODE();
		} catch (error) {
			return error;
		}
	}

	@Post("login")
	@HttpCode(200)
	async loginUser(@Body("username") username: string, @Body("password") password: string, @Body("code") code: string): Promise<User | ResponseType> {
		const user = await this.usersService.findUserByUsername(username);
		if (!user || user.password !== password) {
			// 用户名或密码错误
			return ERROR_CODE.USER_OR_PASSWORD_ERROR;
		}

		delete user.password; // 删除密码

		// 生成 token
		const token = this.authService.generateToken(user);
		const data = {
			user,
			token,
		};

    try {
      // token 存入 redis
      await this.authService.setToken(user, token);
    } catch (error) {
      console.error('set token error', error);
    }

		return SUCCESS_CODE(data);
	}

	@Get('info')
	@HttpCode(200)
	async getUserInfo(@Req() query): Promise<ResponseType<User>> {
		try {
			const tokenUser = query.user;
			const user = await this.usersService.findUserById(tokenUser.id);
			return SUCCESS_CODE(user);
		} catch (error) {
			return error;
		}
	}

	@Get("list")
	@HttpCode(200)
	async getAllUsers(@Body() body: queryUsersDto): Promise<ResponseType> {
		// 分页查询
		const { page = 1, limit = 10 } = body;

		// 参数校验
		if(page < 1 || limit < 1) return ERROR_CODE.PAGE_PARAMS_ERROR;
		if(limit > 100) return ERROR_CODE.PAGE_PARAMS_ERROR;

		try {
			const result = await this.usersService.findUsers(body);
	
			return SUCCESS_CODE(result);
		} catch (error) {
			return error;
		}
	}

	@Put('update')
	@HttpCode(200)
	async updateUser(@Body() body: UpdateUserDto): Promise<ResponseType> {
		try {
			const user = await this.usersService.findUserById(body.id);
			if(!user) return ERROR_CODE.USER_NOT_EXIST;
			await this.usersService.updateUser(body);
			return SUCCESS_CODE(user);
		} catch (error) {
			return error;
		}
	}	
}
