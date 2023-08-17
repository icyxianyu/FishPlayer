import download from "@/utils/httpRequest/download";
import MP4Box, { MP4ArrayBuffer, MP4Info, MP4SourceBuffer } from "mp4box";

export class mp4Player {
  url: string;
  downloader: download;
  mediaSource: MediaSource;
  Video: HTMLVideoElement;
  info!: MP4Info;
  mp4boxfile: MP4Box.MP4File;
  lastSeekTime: number = 0;
  constructor(url: string, Video: HTMLVideoElement) {
    this.url = url;
    this.Video = Video;
    this.mp4boxfile = MP4Box.createFile();
    this.downloader = new download(this.url);
    this.mediaSource = new MediaSource();
    this.Video.src = window.URL.createObjectURL(this.mediaSource);
    this.initEvent();
  }

  // 初始化事件监听函数
  initEvent() {
    const ctx = this;

    // 当媒体源打开时执行的回调
    this.mediaSource.onsourceopen = () => {
      this.loadFile(); // 加载视频文件
    };

    this.mp4boxfile.onSegment = function (
      id,
      user,
      buffer,
      sampleNum,
      is_last,
    ) {
      let sb = user;
      sb.segmentIndex++;
      sb.pendingAppends.push({
        id: id,
        buffer: buffer,
        sampleNum: sampleNum,
        is_last: is_last,
      });
      ctx.onUpdateEnd.call(sb, true, false, ctx); // 调用更新结束回调
    };

    // 设置MP4Box文件的onReady回调函数
    this.mp4boxfile.onReady = function (info: MP4Info) {
      ctx.info = info; // 存储MP4信息
      if (info.isFragmented) {
        ctx.mediaSource.duration = info.fragment_duration / info.timescale; // 设置媒体源的持续时间
      } else {
        ctx.mediaSource.duration = info.duration / info.timescale; // 设置媒体源的持续时间
      }

      ctx.downloader.stop(); // 停止下载器
      ctx.initSourceBuffer(); // 初始化源缓冲区
    };
    // 当发生seeking事件时，如常规的加载或者点击进度条时触发的seeking时，暂停当前下载并开始请求当前时间点的数据
    this.Video.addEventListener("seeking", (e: Event) => {
      let i, start, end;
      let seek_info;
      let video = this.Video;
      if (this.lastSeekTime !== video.currentTime) {
        for (i = 0; i < video.buffered.length; i++) {
          start = video.buffered.start(i);
          end = video.buffered.end(i);
          if (video.currentTime >= start && video.currentTime <= end) {
            return;
          }
        }
        this.downloader.stop();
        seek_info = this.mp4boxfile.seek(video.currentTime, true);
        this.downloader.setChunkStart(seek_info.offset);
        this.downloader.resume();
        this.lastSeekTime = video.currentTime;
      }
    });
  }

  // 将获取到的mime类型的数据添加到对应的源缓冲区中
  initSourceBuffer() {
    for (const p of this.info.tracks) {
      const { id, codec } = p;
      const mime = `video/mp4; codecs="${codec}"`;
      if (MediaSource.isTypeSupported(mime)) {
        const sb = this.mediaSource.addSourceBuffer(mime) as any;
        sb.ms = this.mediaSource;
        sb.id = id;
        this.mp4boxfile.setSegmentOptions(id, sb);
        sb.pendingAppends = [];
      } else {
        console.log(`MIME type '${mime}' not supported`);
      }
    }
    this.initializeSourceBuffers();
  }

  // 初始化源缓冲区
  initializeSourceBuffers() {
    // 调用 MP4Box 的 initializeSegmentation() 方法获取初始化段分割信息
    let initSegs = this.mp4boxfile.initializeSegmentation();
    // 遍历初始化的段分割
    for (let i = 0; i < initSegs.length; i++) {
      // 从初始化段分割中获取源缓冲区对象
      let sb = initSegs[i].user;
      // 如果是第一个分段，将媒体源的 pendingInits 设置为 0
      if (i === 0) {
        sb.ms.pendingInits = 0;
      }
      // 将 onInitAppended 回调函数绑定到源缓冲区的 onupdateend 事件
      sb.onupdateend = this.onInitAppended.bind(this);
      // 向源缓冲区追加初始化分段的数据
      sb.appendBuffer(initSegs[i].buffer);
      // 初始化源缓冲区的分段索引为 0
      sb.segmentIndex = 0;
      // 媒体源的 pendingInits 加一，表示还有未初始化的分段
      sb.ms.pendingInits++;
    }
  }

  // 当初始化分段被添加完成时的回调函数
  onInitAppended(e: Event) {
    let ctx = this;
    let sb = e.target as MP4SourceBuffer;
    // 如果媒体源处于 'open' 状态
    if (sb.ms.readyState === "open") {
      sb.sampleNum = 0; // 初始化样本编号为 0
      sb.onupdateend = null; // 清除更新结束事件的处理函数
      // 添加一个监听器来处理更新结束事件
      sb.addEventListener(
        "updateend",
        this.onUpdateEnd.bind(sb, true, true, ctx), // 绑定更新结束事件的处理函数，并传入相应的参数
      );
      // 调用更新结束事件的处理函数，表示当前添加完成的是初始化分段
      this.onUpdateEnd.call(sb, false, true, ctx);
      sb.ms.pendingInits--; // 媒体源的未初始化分段数量减一
      if (sb.ms.pendingInits === 0) {
        this.start();
      }
    }
  }

  start() {
    this.downloader.setChunkStart(this.mp4boxfile.seek(0, true).offset);
    this.downloader.setChunkSize(1024 * 1024 * 1);
    this.downloader.setInterval(1000);
    this.mp4boxfile.start();
    this.downloader.resume();
  }

  onUpdateEnd(isNotInit: boolean, isEndOfAppend: boolean, ctx: mp4Player) {
    const ct: any = this;
    if (isEndOfAppend === true) {
      if (ct.sampleNum) {
        ctx.mp4boxfile.releaseUsedSamples(ct.id, ct.sampleNum);
        delete ct.sampleNum;
      }
      if (ct.is_last) {
        ct.ms.endOfStream();
      }
    }
    if (
      ct.ms.readyState === "open" &&
      ct.updating === false &&
      ct.pendingAppends.length > 0
    ) {
      let obj = ct.pendingAppends.shift();
      ct.sampleNum = obj.sampleNum;
      ct.is_last = obj.is_last;
      ct.appendBuffer(obj.buffer);
    }
  }

  loadFile() {
    let ctx = this;
    if (this.mediaSource.readyState !== "open") {
      return;
    }
    this.downloader.setChunkSize(1024 * 1024 * 1);
    this.downloader.setUrl(this.url);
    this.downloader.setFunction(function (
      response: MP4ArrayBuffer,
      end: boolean,
    ) {
      if (response) {
        ctx.mp4boxfile.appendBuffer(response, end);
      }
      if (end) {
        ctx.mp4boxfile.flush();
      } else {
        ctx.downloader.setChunkStart(
          ctx.downloader.chunkStart + response.byteLength,
        );
      }
    });
    this.downloader.start();
  }
}
