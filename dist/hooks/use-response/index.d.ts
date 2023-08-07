export declare function useResponse(): {
    failRes: (code: number, msg: '失败') => {
        code: number;
        msg: "失败";
    };
    successRes: (data: any) => {
        code: number;
        data: any;
    };
};
