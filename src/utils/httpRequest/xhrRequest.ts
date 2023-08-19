import { XHRConfig } from "@/types";

class xhrRequest {
  xhr: XMLHttpRequest;
  constructor() {}
  send(XHRConfig: XHRConfig) {
    let { request, success, error, abort, progress } = XHRConfig;

    if (request.xhr) {
      this.xhr = request.xhr;
    } else {
      this.xhr = new XMLHttpRequest();
      request.xhr = this.xhr;
    }

    this.xhr.open(request.method || "get", request.url || "");

    this.xhr.responseType = request.responseType as XMLHttpRequestResponseType;
    for (const key in request.header) {
      this.xhr.setRequestHeader(
        key,
        (request.header as Record<string, string>)[key],
      );
    }

    this.xhr.onprogress = (event) => {
      // 在数据传输过程中多次触发，用于监测进度
      // event.loaded: 已经加载的数据大小
      // event.total: 总数据大小
      progress && progress.call(this.xhr, event);
    };

    this.xhr.onload = (event) => {
      // 请求成功完成时触发，类似于 onreadystatechange 的处理，但仅当请求成功时才触发
      success && success.call(this.xhr, this.xhr.response);
    };

    this.xhr.onerror = (event) => {
      // 请求失败时触发
      error && error.call(this.xhr, event);
    };

    this.xhr.onabort = (event) => {
      // 请求被中止时触发（调用 this.xhr.abort()）
      abort && abort.call(this.xhr, event);
    };
    this.xhr.send();
  }
  cancel() {
    this.xhr.abort();
  }
}

export default xhrRequest;
