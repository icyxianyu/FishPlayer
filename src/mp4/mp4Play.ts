import download from "@/utils/httpRequest/download";
import MP4Box, { MP4ArrayBuffer, MP4Info } from 'mp4box'

class mp4Player {
    url: string;
    downloader!: download;
    mediaSource!: MediaSource;
    Video: HTMLVideoElement;
    info!: MP4Info
    mp4boxfile!: MP4Box.MP4File;
    constructor(url: string, Video: HTMLVideoElement) {
        this.url = url;
        this.Video = Video;
        this.mp4boxfile = MP4Box.createFile();
        this.downloader = new download(this.url);
        this.mediaSource = new MediaSource();
        this.Video.src = window.URL.createObjectURL(this.mediaSource);
        this.initEvent();
    }


    initEvent() {
        const ctx = this;
        this.mp4boxfile.onReady = function (info: MP4Info) {
            ctx.info = info;
            if (info.isFragmented) {
                ctx.mediaSource.duration = info.fragment_duration / info.timescale;
            } else {
                ctx.mediaSource.duration = info.duration / info.timescale;
            }

            ctx.downloader.stop();
            ctx.initSourceBuffer();
        }
        

        this.mediaSource.onsourceopen = () => {
            this.loadFile();
            console.log(this.mp4boxfile);
        }
    }

    initSourceBuffer() {
        for (const p of this.info.tracks) {
            const { id, codec } = p;
            const mime = `video/mp4; codecs="${codec}"`;
            if (MediaSource.isTypeSupported(mime)) {
                const sb: MP4Box.MP4SourceBuffer = this.mediaSource.addSourceBuffer(mime);
                sb.ms = this.mediaSource;
                sb.id = id;
                this.mp4boxfile.setSegmentOptions(id, sb)
                sb.pendingAppends = [];
            } else {
                console.log(`MIME type '${mime}' not supported`);
            }
        }

    }

    loadFile() {
        let ctx = this;
        if (this.mediaSource.readyState !== 'open') {
            return
        }
        this.downloader.setChunkSize(1024 * 1024 * 1)
        this.downloader.setFunction(
            function (response: MP4ArrayBuffer, end: boolean, error: any) {
                if (response) {
                    ctx.mp4boxfile.appendBuffer(response, end);
                }
                if (end) {
                    ctx.mp4boxfile.flush();
                } else {
                    ctx.downloader.setChunckStart(ctx.downloader.chunkStart + response.byteLength);
                }

            }
        )
        this.downloader.start()
    }
}

export default mp4Player;
