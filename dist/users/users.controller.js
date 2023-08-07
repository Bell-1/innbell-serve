"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_service_1 = require("../auth/auth.service");
const response_1 = require("../utils/response");
const query_users_dto_1 = require("./dto/query-users.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UsersController = exports.UsersController = class UsersController {
    usersService;
    authService;
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async registerUser(registerUserDto) {
        try {
            if (!registerUserDto.username) {
                return response_1.ERROR_CODE.USERNAME_EMPTY;
            }
            if (!registerUserDto.password) {
                return response_1.ERROR_CODE.PASSWORD_EMPTY;
            }
            const user = await this.usersService.registerUser(registerUserDto);
            return (0, response_1.SUCCESS_CODE)(user);
        }
        catch (error) {
            return error;
        }
    }
    async deleteUser(id, res) {
        try {
            const user = await this.usersService.findUserById(id);
            if (!user)
                return response_1.ERROR_CODE.USER_NOT_EXIST;
            await this.usersService.deleteUser(user);
            return res.status(200).SUCCESS_CODE();
        }
        catch (error) {
            return error;
        }
    }
    async loginUser(username, password, code) {
        const user = await this.usersService.findUserByUsername(username);
        if (!user || user.password !== password) {
            return response_1.ERROR_CODE.USER_OR_PASSWORD_ERROR;
        }
        delete user.password;
        const token = this.authService.generateToken(user);
        const data = {
            user,
            token,
        };
        try {
            await this.authService.setToken(user, token);
        }
        catch (error) {
            console.error('set token error', error);
        }
        return (0, response_1.SUCCESS_CODE)(data);
    }
    async getUserInfo(query) {
        try {
            const tokenUser = query.user;
            const user = await this.usersService.findUserById(tokenUser.id);
            return (0, response_1.SUCCESS_CODE)(user);
        }
        catch (error) {
            return error;
        }
    }
    async getAllUsers(body) {
        const { page = 1, limit = 10 } = body;
        if (page < 1 || limit < 1)
            return response_1.ERROR_CODE.PAGE_PARAMS_ERROR;
        if (limit > 100)
            return response_1.ERROR_CODE.PAGE_PARAMS_ERROR;
        try {
            const result = await this.usersService.findUsers(body);
            return (0, response_1.SUCCESS_CODE)(result);
        }
        catch (error) {
            return error;
        }
    }
    async updateUser(body) {
        try {
            const user = await this.usersService.findUserById(body.id);
            if (!user)
                return response_1.ERROR_CODE.USER_NOT_EXIST;
            await this.usersService.updateUser(body);
            return (0, response_1.SUCCESS_CODE)(user);
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Delete)('one/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)("username")),
    __param(1, (0, common_1.Body)("password")),
    __param(2, (0, common_1.Body)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('info'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)("list"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_users_dto_1.queryUsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService, auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map