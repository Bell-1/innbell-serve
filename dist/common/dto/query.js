"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryPageResultDto = exports.queryPageDto = void 0;
class queryPageDto {
    page;
    limit;
    keyword;
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.keyword = '';
    }
}
exports.queryPageDto = queryPageDto;
class QueryPageResultDto {
    list;
    total;
    page;
    limit;
    constructor(list, total, page, limit) {
        this.list = list;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
exports.QueryPageResultDto = QueryPageResultDto;
//# sourceMappingURL=query.js.map