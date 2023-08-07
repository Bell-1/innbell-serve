import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    id: number;
    username: string;
    phone: string;
    email: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    isBanned: boolean;
    avatar: string;
    nickname: string;
}
export {};
