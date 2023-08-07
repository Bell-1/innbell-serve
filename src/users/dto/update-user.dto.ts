import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
