import { UsersService } from "./users.service";
import { AuthService } from "@/auth/auth.service";
import { User } from "./entities/user.entity";
import { ResponseType } from "@/utils/response";
import { queryUsersDto } from "./dto/query-users.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    registerUser(registerUserDto: CreateUserDto): Promise<ResponseType<User>>;
    deleteUser(id: number, res: any): Promise<ResponseType>;
    loginUser(username: string, password: string, code: string): Promise<User | ResponseType>;
    getUserInfo(query: any): Promise<ResponseType<User>>;
    getAllUsers(body: queryUsersDto): Promise<ResponseType>;
    updateUser(body: UpdateUserDto): Promise<ResponseType>;
}
