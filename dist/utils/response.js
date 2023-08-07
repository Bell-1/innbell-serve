"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODE = exports.SUCCESS_CODE = void 0;
function SUCCESS_CODE(data = null) {
    return {
        code: 0,
        data,
        message: "success",
    };
}
exports.SUCCESS_CODE = SUCCESS_CODE;
exports.ERROR_CODE = {
    USER_EXIST: { code: 1001, message: "用户名已存在" },
    USER_OR_PASSWORD_ERROR: { code: 1002, message: "用户名或密码错误" },
    USER_NOT_EXIST: { code: 1003, message: "用户不存在" },
    USER_BANNED: { code: 1004, message: "用户被禁用" },
    USER_NOT_LOGIN: { code: 1005, message: "用户未登录" },
    USER_NOT_AUTH: { code: 1006, message: "用户未授权" },
    USERNAME_EXIST: { code: 1001, message: "用户名已存在" },
    USERNAME_EMPTY: { code: 1001, message: "用户名不能为空" },
    PASSWORD_EMPTY: { code: 1002, message: "密码不能为空" },
    USER_NOT_BIND_PHONE: { code: 1007, message: "用户未绑定手机号" },
    USER_NOT_BIND_EMAIL: { code: 1008, message: "用户未绑定邮箱" },
    USER_NOT_BIND_THIRD: { code: 1009, message: "用户未绑定第三方账号" },
    USER_BIND_PHONE: { code: 1010, message: "用户已绑定手机号" },
    USER_BIND_EMAIL: { code: 1011, message: "用户已绑定邮箱" },
    USER_BIND_THIRD: { code: 1012, message: "用户已绑定第三方账号" },
    USER_NAME_INVALID: { code: 1013, message: "用户名不合法" },
    PASSWORD_INVALID: { code: 1014, message: "密码不合法" },
    PHONE_INVALID: { code: 1015, message: "手机号不合法" },
    EMAIL_INVALID: { code: 1016, message: "邮箱不合法" },
    CODE_INVALID: { code: 1017, message: "验证码不合法" },
    CODE_EXPIRED: { code: 1018, message: "验证码已过期" },
    CODE_ERROR: { code: 1019, message: "验证码错误" },
    PASSWORD_NOT_SAME: { code: 1020, message: "两次输入的密码不一致" },
    PARAMS_ERROR: { code: 1021, message: "参数错误" },
    PAGE_PARAMS_ERROR: { code: 1022, message: "分页参数错误" },
    NOT_LOGIN: { code: 1023, message: "未登录" },
    NO_PERMISSION: { code: 1024, message: "没有权限" },
};
//# sourceMappingURL=response.js.map