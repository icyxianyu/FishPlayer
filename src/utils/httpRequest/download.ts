import { header } from "@/types";
import httpRequest from "./httpRequest";
import xhrRequest from "./xhrRequest";

interface initInterface {
    chunkSize: number;
    chunkStart: number;
    totalLength: number;
    time: number;
}
class download {
    url: string;
    xhrRequest: xhrRequest;

    chunkSize: number = Infinity;
    chunkStart: number = 0;
    totalLength: number = 0;
    time: number = 1000;
    timeoutID: number | undefined;

    isGetFile: boolean = false;

    constructor(url: string) {
        this.url = url;
        this.xhrRequest = new xhrRequest();
    }
    init({ chunkSize, chunkStart, totalLength, time }: initInterface) {
        this.chunkSize = chunkSize;
        this.chunkStart = chunkStart;
        this.totalLength = totalLength;
        this.time = time;
    }
    start() {
        this.chunkStart = 0;
        this.resume();
    }

    stop() {
        clearTimeout(this.timeoutID)
        this.timeoutID = undefined
        this.isGetFile = false
    }

    resume() {
        this.isGetFile = true;
        this.getFile();
    }

    initHttpRequest() {
        let xhr = new XMLHttpRequest();
        let header: header = {}
        if (this.chunkSize + this.chunkStart < Infinity) {
            // 判断是否需要设置range
            let range = `bytes=${this.chunkStart}-${this.chunkStart + this.chunkSize - 1}`
            header['Range'] = range
        }
        let request = new httpRequest({
            url: this.url,
            header: header,
            method: 'get',
            xhr: xhr,
        })
        return request
    }

    getFile() {
        let ctx = this
        if (!ctx.isGetFile
            && ctx.totalLength !== 0
            && ctx.chunkStart >= ctx.totalLength)
            return
        const request = ctx.initHttpRequest();
        ctx.xhrRequest.send({
            request,
            success: function success(response: any) {
                let xhrCtx = this as unknown as XMLHttpRequest;
                console.log(xhrCtx)
                let range = xhrCtx.getResponseHeader('Content-Range')
                if (ctx.totalLength === 0 && range) {
                    const rangeInfo = range.split('/')
                    const totalLength = rangeInfo[1]
                    console.log(totalLength)

                }
            },
            error,
        })


        function error() {

        }
    }
}

export default download;
