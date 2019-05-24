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
    if (e instanceof api.JsonapiError) {
        // api returns error code and message
        console.log("Error code: " + e.code);
        console.log("Error detail: " + e.detail);
    } else {
        // general error like invalid response/connot connect to server/...
        console.log(e);
    }
} finally {
    cleanup();
}
```