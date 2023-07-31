import { header, httpConfig, method } from "@/types";


class HTTPRequest {
    url: string | undefined;
    header: header | undefined;
    method: method | undefined;
    responseType: string;
    xhr: XMLHttpRequest | undefined;
    constructor(config: httpConfig) {
        this.url = config.url;
        this.header = config.header;
        this.method = config.method;
        this.responseType = config.responseType || 'arraybuffer'
        this.xhr = config.xhr
    }
}

export default HTTPRequest