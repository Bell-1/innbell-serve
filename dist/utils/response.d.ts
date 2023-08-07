export interface ResponseType<T = any> {
    code: number;
    data?: T;
    message: string;
}
export declare function SUCCESS_CODE(data?: any): {
    code: number;
    data: any;
    message: string;
};
export declare const ERROR_CODE: Record<string, ResponseType>;
