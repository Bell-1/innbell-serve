export declare class queryPageDto {
    page: number;
    limit: number;
    keyword?: string;
    constructor();
}
export declare class QueryPageResultDto<T> {
    list: T[];
    total: number;
    page: number;
    limit: number;
    constructor(list: T[], total: number, page: number, limit: number);
}
