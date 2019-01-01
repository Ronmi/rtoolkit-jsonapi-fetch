export declare function parseResp<T>(resp: Response): Promise<T>;
export declare function postResp(uri: Request | string, data?: any): Promise<Response>;
export declare function post<T>(uri: Request | string, data?: any): Promise<T>;
export declare function getResp(uri: Request | string): Promise<Response>;
export declare function get<T>(uri: Request | string): Promise<T>;
export declare function multipartResp(uri: Request | string, data: FormData | {
    [k: string]: string | Blob | File;
}): Promise<Response>;
export declare function multipart<T>(uri: Request | string, data: FormData | {
    [k: string]: string | Blob | File;
}): Promise<T>;
export declare function formResp(uri: Request | string, data: {
    [k: string]: any;
}): Promise<Response>;
export declare function form<T>(uri: Request | string, data: {
    [k: string]: any;
}): Promise<T>;
