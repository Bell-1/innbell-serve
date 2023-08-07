import { AppService } from './app.service';
import { Request } from 'express';
declare class HelloDto {
    readonly name: string;
    readonly age: number;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(request: Request, query: any): string;
    postHello(request: Request, helloDto: HelloDto): HelloDto;
}
export {};
