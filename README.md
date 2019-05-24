Communicating with server written with [rtoolkit/jsonapi](https://godoc.org/github.com/Ronmi/rtoolkit/jsonapi)

Need polyfill for `Promise` and `fetch` if running on legacy browser.

# Synopsis (in typescript)

```typescript
import * as api from 'rtoolkit-jsonapi-fetch';

interface MyParam {
    param1: string;
    param2: string;
}

interface MyResp {
    data1: string;
    data2: string;
}

async function myApi(params: MyParam): Promise<MyResp> {
    return await api.post<MyResp>('/api/my_endpoint', params)
}

try {
    const resp = await myApi(params);
    console.log(resp);
} catch (e) {
    const msg = api.handleError<string>(e, (x) => {
        // api returns error code and message
        console.log("Error code: " + x.code);
        console.log("Error detail: " + x.detail);
        return 'Server returns error code: ' + x.code);
    }, (e) => {
        // general error like invalid response/connot connect to server/...
        console.log(e);
        return 'Unexpected error: ' + e.message;
    });

    alert(msg);
} finally {
    cleanup();
}
```