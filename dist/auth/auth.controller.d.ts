import { User } from '@/users/entities/user.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: User): Promise<{
        token: string;
    }>;
}
