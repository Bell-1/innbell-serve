export class queryUsersDto {
	page: number;
	limit: number;
	// 关键字 模糊查询 用户名、手机号、邮箱
	keyword: string;

	constructor() {
		this.page = 1;
		this.limit = 10;
		this.keyword = "";
	}
}
