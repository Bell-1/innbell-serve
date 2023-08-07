"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ioredis_1 = require("@nestjs-modules/ioredis");
const auth_middleware_1 = require("./common/middleware/auth.middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./roles/roles.module");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: 'users/login', method: common_1.RequestMethod.POST }, { path: 'users/register', method: common_1.RequestMethod.POST }, { path: 'users/one/:id', method: common_1.RequestMethod.DELETE }, { path: 'auth/login', method: common_1.RequestMethod.POST })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                "type": "mysql",
                "host": "127.0.0.1",
                "port": 3306,
                "username": "root",
                "password": "zaq1ZAQ!",
                "database": "innbell",
                "entities": ["dist/**/*.entity{.ts,.js}"],
                "synchronize": true,
                "logging": true
            }),
            ioredis_1.RedisModule.forRoot({
                config: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
        ],
        controllers: [
            app_controller_1.AppController,
        ],
        providers: [
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map