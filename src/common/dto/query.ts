// 分页查询
export class queryPageDto {
	page: number;
	limit: number;
	keyword?: string;

	constructor() {
		this.page = 1;
		this.limit = 10;
		this.keyword = '';
	}
}

// 分页查询结果
export class QueryPageResultDto<T> {
	list: T[];
	total: number;
	page: number;
	limit: number;

	constructor(list: T[], total: number, page: number, limit: number) {
		this.list = list;
		this.total = total;
		this.page = page;
		this.limit = limit;
	}
}
