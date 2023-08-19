import { header } from "@/types";
import httpRequest from "./httpRequest";
import xhrRequest from "./xhrRequest";

interface initInterface {
  chunkSize?: number;
  chunkStart?: number;
  totalLength?: number;
  time?: number;
}
class download {
  url: string;
  xhrRequest: xhrRequest;

  chunkSize: number = Infinity;
  chunkStart: number = 0;
  totalLength: number = 0;
  time: number = 1000;
  callback: Function = () => {};

  isGetFile: boolean = false;
  isEnd = false;
  timeoutID: NodeJS.Timeout | undefined;

  constructor(url: string) {
    this.url = url;
    this.xhrRequest = new xhrRequest();
  }
  init({ chunkSize, chunkStart, totalLength, time }: initInterface) {
    if (chunkSize) this.chunkSize = chunkSize;
    if (chunkStart) this.chunkStart = chunkStart;
    if (totalLength) this.totalLength = totalLength;
    if (time) this.time = time;
  }
  start() {
    this.chunkStart = 0;
    this.resume();
  }
  // 取消上一次请求
  cancel() {
    this.xhrRequest.cancel();
  }
  stop() {
    clearTimeout(this.timeoutID);
    this.timeoutID = undefined;
    this.isGetFile = false;
  }

  resume() {
    this.isGetFile = true;
    this.getFile();
  }

  setUrl(url: string) {
    this.url = url;
  }

  setInterval(time: number) {
    this.time = time;
  }

  setChunkStart(chunkStart: number) {
    this.chunkStart = chunkStart;
  }

  setChunkSize(chunkSize: number) {
    this.chunkSize = chunkSize;
  }

  setFunction(callback: Function) {
    this.callback = callback;
  }

  setIsGetFile(isActive: boolean) {
    this.isGetFile = isActive;
  }

  initHttpRequest() {
    let xhr = new XMLHttpRequest();
    let header: header = {};
    if (this.chunkSize + this.chunkStart < Infinity) {
      // 判断是否需要设置range
      let range = `bytes=${this.chunkStart}-${
        this.chunkStart + this.chunkSize - 1
      }`;
      header["Range"] = range;
    }
    let request = new httpRequest({
      url: this.url,
      header: header,
      method: "get",
      xhr: xhr,
    });

    return request;
  }

  getFile() {
    let ctx = this;
    if (
      !ctx.isGetFile &&
      ctx.totalLength !== 0 &&
      ctx.chunkStart >= ctx.totalLength
    )
      return;
    const request = ctx.initHttpRequest();
    ctx.xhrRequest.send({
      request,
      success: function success(response: any) {
        ctx.isEnd =
          response.byteLength !== ctx.chunkSize ||
          response.byteLength === ctx.totalLength;
        response.fileStart = ctx.chunkStart;
        ctx.callback(response, ctx.isEnd);

        if (ctx.isGetFile && !ctx.isEnd) {
          ctx.timeoutID = setTimeout(() => {
            ctx.getFile();
          }, ctx.time);
        }
      },
      error,
    });

    function error() {
      ctx.callback(null, false, true);
    }
  }
}

export default download;
