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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const response_1 = require("../utils/response");
let UsersService = exports.UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerUser({ username, password }) {
        const existingUser = await this.findUserByUsername(username);
        if (existingUser) {
            throw response_1.ERROR_CODE.USERNAME_EXIST;
        }
        const user = this.userRepository.create({ username, password });
        this.userRepository.save(user);
        console.log(user);
        const registeredUser = await this.findUserById(user.id);
        console.log(registeredUser, 'registeredUser');
        if (!registeredUser) {
            throw new Error('Failed to register user');
        }
        delete user.password;
        return user;
    }
    async findUserByUsername(username) {
        const options = { where: { username } };
        return this.userRepository.findOne(options);
    }
    async findUserById(id) {
        const options = { where: { id } };
        return this.userRepository.findOne(options);
    }
    async findUsers(options) {
        const { page = 1, limit = 10, keyword } = options;
        const offset = (page - 1) * limit;
        const queryBuilder = this.userRepository.createQueryBuilder("user");
        if (keyword) {
            queryBuilder.where(`user.username LIKE :keyword OR user.phone LIKE :keyword OR user.email LIKE :keyword`, { keyword: `%${keyword}%` });
        }
        const total = await queryBuilder.getCount();
        const users = await queryBuilder
            .skip(offset)
            .take(limit)
            .getMany();
        users.forEach((user) => {
            delete user.password;
        });
        return { list: users, total, page, limit };
    }
    deleteUser(user) {
        return this.userRepository.remove(user);
    }
    updateUser(user) {
        return this.userRepository.save(user);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map