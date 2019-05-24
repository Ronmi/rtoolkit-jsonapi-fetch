"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function withApiError(e) {
    var ret = new Error(e.detail);
    ret.jsonapi = e;
    return ret;
}
function apiError(e) {
    var x = e;
    if (x.hasOwnProperty('jsonapi')) {
        return x.jsonapi;
    }
    return null;
}
exports.apiError = apiError;
function handleError(e, apiErrHandler, generalHandler) {
    var x = apiError(e);
    if (x === null) {
        return generalHandler(e);
    }
    return apiErrHandler(x);
}
exports.handleError = handleError;
function parseResp(resp) {
    return __awaiter(this, void 0, void 0, function () {
        var e, txt, x, er_1, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!resp.ok) return [3 /*break*/, 5];
                    e = null;
                    txt = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resp.text()];
                case 2:
                    txt = _a.sent();
                    x = JSON.parse(txt);
                    if (!!x.errors) {
                        e = x.errors[0];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    er_1 = _a.sent();
                    throw new Error(txt);
                case 4: throw withApiError(e);
                case 5: return [4 /*yield*/, resp.json()];
                case 6:
                    data = _a.sent();
                    if (!!data.errors) {
                        throw withApiError(data.errors[0]);
                    }
                    return [2 /*return*/, data.data];
            }
        });
    });
}
exports.parseResp = parseResp;
function grabResp(uri, init) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (init) {
                        init.credentials = 'include';
                    }
                    else {
                        init = { credentials: 'include' };
                    }
                    return [4 /*yield*/, fetch(uri, init)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function postResp(uri, data) {
    return grabResp(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}
exports.postResp = postResp;
function post(uri, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postResp(uri, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, parseResp(resp)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.post = post;
function getResp(uri) {
    return grabResp(uri);
}
exports.getResp = getResp;
function get(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, grabResp(uri)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, parseResp(resp)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.get = get;
function multipartResp(uri, data) {
    var f = new FormData();
    if (data instanceof FormData) {
        f = data;
    }
    else {
        for (var k in data) {
            if (!data.hasOwnProperty(k)) {
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
exports.multipartResp = multipartResp;
function multipart(uri, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, multipartResp(uri, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, parseResp(resp)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.multipart = multipart;
function formResp(uri, data) {
    var body = '';
    for (var k in data) {
        if (!data.hasOwnProperty(k)) {
            continue;
        }
        body += encodeURIComponent(k) + '=' + encodeURIComponent(String(data[k])) + '&';
    }
    return grabResp(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
    });
}
exports.formResp = formResp;
function form(uri, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, formResp(uri, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, parseResp(resp)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.form = form;
