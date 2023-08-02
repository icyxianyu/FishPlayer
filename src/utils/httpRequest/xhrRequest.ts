import { XHRConfig } from "@/types"

class xhrRequest {
    constructor() { }
    send(XHRConfig: XHRConfig) {
        let {
            request,
            success,
            error,
            abort,
            progress
        } = XHRConfig;

        let xhr: XMLHttpRequest;
        if (request.xhr) {
            xhr = request.xhr;
        } else {
            xhr = new XMLHttpRequest();
            request.xhr = xhr;
        }

        xhr.open(request.method || 'get', request.url || '');
    
        xhr.responseType = request.responseType as XMLHttpRequestResponseType;
        for (const key in request.header) {
            xhr.setRequestHeader(key,
                (request.header as Record<string, string>)[key]);
        }


        xhr.onprogress = function (event) {
            // 在数据传输过程中多次触发，用于监测进度
            // event.loaded: 已经加载的数据大小
            // event.total: 总数据大小
            progress && progress.call(xhr, event);
        };

        xhr.onload = function (event) {
            // 请求成功完成时触发，类似于 onreadystatechange 的处理，但仅当请求成功时才触发
            success && success.call(xhr, xhr.response);
        };

        xhr.onerror = function (event) {
            // 请求失败时触发      
            error && error.call(xhr, event);
        };

        xhr.onabort = function (event) {
            // 请求被中止时触发（调用 xhr.abort()）
            abort && abort.call(xhr, event);
        };
        xhr.send();
    }
}

export default xhrRequest;