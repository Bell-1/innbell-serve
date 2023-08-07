import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

describe("UsersService", () => {
	let service: UsersService;
	let connection: Connection;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: "sqlite",
					database: ":memory:",
					entities: [User],
					synchronize: true,
				}),
				TypeOrmModule.forFeature([User]),
			],
			providers: [UsersService],
		}).compile();

		service = module.get<UsersService>(UsersService);
		connection = module.get<Connection>(Connection);
	});

	afterAll(async () => {
		await connection.close();
	});

	beforeEach(async () => {
		await connection.dropDatabase();
		await connection.runMigrations();
	});

	it("should create a user", async () => {
		const user = await service.registerUser("John Doe", "123456");
		expect(user).toBeDefined();
		expect(user.id).toBeDefined();
		expect(user.username).toBe("John Doe");
		expect(user.password).toBe("123456");
	});
});
