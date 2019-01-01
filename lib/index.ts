interface JsonResp {
    data?: any;
    errors?: any[];
}

export async function parseResp<T>(resp: Response): Promise<T> {
    if (!resp.ok) {
        let e = null as any;
        let txt = '';
        try {
            txt = await resp.text();
            const x = JSON.parse(txt) as JsonResp;
            if (!!x.errors) {
                e = x.errors[0].detail;
            }
        } catch (e) {
            throw new Error(txt);
        }
        throw new Error(e);
    }

    const data = await resp.json() as JsonResp;
    if (!!data.errors) {
        throw new Error(data.errors[0].detail);
    }

    return data.data as T;
}

async function grabResp(uri: Request | string, init?: RequestInit): Promise<Response> {
    if (init) {
        init.credentials = 'include';
    } else {
        init = { credentials: 'include' };
    }

    return await fetch(uri, init);
}

export function postResp(uri: Request|string, data?: any): Promise<Response> {
    return grabResp(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
}

export async function post<T>(uri: Request|string, data?: any): Promise<T> {
    const resp = await postResp(uri, data);
    return await parseResp<T>(resp);
}

export function getResp(uri: Request|string): Promise<Response> {
    return grabResp(uri);
}

export async function get<T>(uri: Request|string): Promise<T> {
    const resp = await grabResp(uri);
    return await parseResp<T>(resp);
}

export function multipartResp(uri: Request|string, data: FormData|{[k: string]: string|Blob|File}): Promise<Response> {
    let f = new FormData();
    if (data instanceof FormData) {
        f = data;
    } else {
        for (const k in data) {
            if (! data.hasOwnProperty(k)) {
                continue;
            }

            f.set(k, data[k]);
        }
    }

    return grabResp(uri, {
        method: 'POST',
        body: f,
    });
}
export async function multipart<T>(uri: Request|string, data: FormData|{[k: string]: string|Blob|File}): Promise<T> {
    const resp = await multipartResp(uri, data);
    return await parseResp<T>(resp);
}

export function formResp(uri: Request|string, data: {[k: string]: any}): Promise<Response> {
    let body = '';
    for (const k in data) {
        if (! data.hasOwnProperty(k)) {
            continue;
        }

        body += encodeURIComponent(k) + '=' + encodeURIComponent(String(data[k])) + '&';
    }

    return grabResp(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        body,
    });
}

export async function form<T>(uri: Request|string, data: {[k: string]: any}): Promise<T> {
    const resp = await formResp(uri, data);
    return await parseResp<T>(resp);
}