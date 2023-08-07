import { Controller, Get, Post, Body, Headers, Patch, Param, Delete } from '@nestjs/common';
import { User } from '@/users/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: User) {
    const token = this.authService.generateToken(user);
    this.authService.setToken(user, token);
    return { token };
  }
}
