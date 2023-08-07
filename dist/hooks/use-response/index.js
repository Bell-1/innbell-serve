"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResponse = void 0;
function useResponse() {
    function failRes(code, msg) {
        return {
            code,
            msg
        };
    }
    function successRes(data) {
        return {
            code: 0,
            data
        };
    }
    return {
        failRes,
        successRes,
    };
}
exports.useResponse = useResponse;
//# sourceMappingURL=index.js.map