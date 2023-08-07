declare enum Gender {
    Unknown = 0,
    Male = 1,
    Female = 2
}
export declare class Country {
    id: number;
    name: string;
}
export declare class User {
    id: number;
    username: string;
    password: string;
    phone: string;
    email: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    isBanned: boolean;
    avatar: string;
    nickname: string;
    gender: Gender;
    birthday: Date;
    createTime: Date;
    updateTime: Date;
    country: Country;
}
export {};
