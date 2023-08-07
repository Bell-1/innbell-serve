import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { queryPageDto, QueryPageResultDto } from "@/common/dto/query";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    registerUser({ username, password }: CreateUserDto): Promise<User>;
    findUserByUsername(username: string): Promise<User | undefined>;
    findUserById(id: number): Promise<User | undefined>;
    findUsers(options: queryPageDto): Promise<QueryPageResultDto<User>>;
    deleteUser(user: User): Promise<User>;
    updateUser(user: UpdateUserDto): Promise<UpdateUserDto & User>;
}
