// users.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

// 枚举类型，表示性别
enum Gender {
	Unknown = 0,
	Male = 1,
	Female = 2,
}

@Entity()
export class Country {
	// 国家ID
	@PrimaryGeneratedColumn()
	id: number;

	// 国家名称
	@Column({ unique: true })
	name: string;
}

@Entity()
export class User {
	// 用户ID
	@PrimaryGeneratedColumn()
	id: number;

	// 用户名
	@Column({ unique: true, nullable: true })
	username: string;

	// 密码
	@Column({ nullable: true })
	password: string;

	// 手机号
	@Column({ nullable: true })
	phone: string;

	// 邮箱
	@Column({ nullable: true })
	email: string;

	// 是否管理员
	@Column({ default: false })
	isAdmin: boolean;

	// 是否超级管理员
	@Column({ default: false })
	isSuperAdmin: boolean;

	// 是否被封禁
	@Column({ default: false })
	isBanned: boolean;

	// 头像
	@Column({ nullable: true })
	avatar: string;

	// 昵称
	@Column({ nullable: true })
	nickname: string;

	// 性别
	@Column({ type: "enum", enum: Gender, default: Gender.Unknown })
	gender: Gender;

	// 生日
	@Column({ type: "date", nullable: true })
	birthday: Date;

	// 创建时间
	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createTime: Date;

	// 更新时间
	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	updateTime: Date;

	// 所在国家
	@ManyToOne(() => Country, { nullable: true })
	country: Country;
}
