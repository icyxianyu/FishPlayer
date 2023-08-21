import { Player } from "@/page";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { danmakuOptions } from "@/types/player";
import { Component } from "@/utils/createElement";

export class danmaku extends Component {
  trackNum: number = 30;
  opacity: string = "100%";
  danmakuPool: any[] = [];
  player: Player;
  dispPool: any[] = [];
  observer: IntersectionObserver;
  isPause: boolean = true;
  trackArray: boolean[];
  isShow: boolean = true;
  timer!: NodeJS.Timer;
  danmakuOptions: danmakuOptions | undefined;
  video: HTMLVideoElement;

  constructor(container: HTMLElement, video: Video, player: Player) {
    super(container, "div", { class: "danmaku" });
    const { danmaku } = video.options;
    if (!danmaku) return;
    this.danmakuOptions = danmaku;
    this.trackArray = new Array(this.trackNum).fill(true);
    this.video = video.element as HTMLVideoElement;
    this.player = player;
    this.initAnimate();
    this.initEventHub();
    this.observer = new IntersectionObserver(
      this.handleIntersction.bind(this),
      {
        root: this.player.element,
        threshold: [0, 1.0],
      },
    );
  }

  initAnimate() {
    const ctx = this;
    function arr() {
      if (!ctx.isPause) {
        ctx.danmakuPool.forEach((item: HTMLElement) => {
          item.style.left =
            parseFloat(item.style.left.replace("%", "")) - 0.1 + "%";
          ctx.observer.observe(item);
        });
      }
      requestAnimationFrame(arr);
    }
    requestAnimationFrame(arr);
  }

  handleIntersction(entries: IntersectionObserverEntry[]) {
    entries.forEach((item: IntersectionObserverEntry) => {
      if (!item.isIntersecting) {
        (item.target as HTMLElement).style.display = "none";
        this.dispPool.push(item.target);
        this.danmakuPool = this.danmakuPool.filter(
          (danmu: HTMLElement) => danmu !== item.target,
        );
      }

      if (item.intersectionRatio === 1) {
        const line =
          (item.target as HTMLElement).getAttribute("data-line") ?? "0";
        if (this.trackArray.length > parseInt(line))
          this.trackArray[parseInt(line)] = true;
      }
    });
  }

  initEventHub() {
    Store.onIsPause((item: boolean) => {
      this.isPause = item;
      this.setDanmaku(item, this.isShow);
    });

    Store.onDanmu((item: boolean) => {
      this.isShow = item;
      this.setDanmaku(this.isPause, item);
    });

    Store.onWaiting((item: boolean) => {
      this.setDanmaku(this.isPause, this.isShow, item);
    });

    Store.onOpacityChange((item: string) => {
      this.opacity = item + "%";
    });

    Store.onDanmuAreaChange((item: string) => {
      let arrLen = Math.floor((parseInt(item) / 100) * this.trackNum);
      this.trackArray = new Array(arrLen).fill(true);
    });
  }

  setDanmaku(isPause: boolean, isShow: boolean, isWaiting?: boolean) {
    if (isWaiting) {
      clearInterval(this.timer);
      this.element.innerHTML = "";
      this.danmakuPool = [];
      this.dispPool = [];
      return;
    }

    if (isShow) {
      if (!isPause) {
        this.inseret();
      } else {
        clearInterval(this.timer);
      }
    } else {
      clearInterval(this.timer);
      this.element.innerHTML = "";
      this.danmakuPool = [];
      this.dispPool = [];
    }
  }
  // 请求数据
  inseret() {
    // 插入数据
    const { url, data, interval, ...rest } = this.danmakuOptions ?? {};

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (url) {
        let arr: any = [];
        fetch(url, {
          ...rest,
          body: JSON.stringify({
            ...data,
            time: this.video.currentTime,
          }),
        })
          .then((item) => item.json())
          .then((item: any) => {
            for (let i = 0; i < item.length; i++) {
              arr.push({
                text: item[i].text,
                color: item[i].color,
                line: this.getTrack(),
              });
            }
            this.appendElement(arr);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let arr = [];
        for (let i = 0; i < Math.random() * 3; i++) {
          arr.push({
            text: i + "测试弹幕,测试弹幕",
            color: "#fff",
            line: this.getTrack(),
          });
        }
        this.appendElement(arr);
      }
    }, interval ?? 500);
  }
  // 插入弹幕 DOM， 包括弹幕池有数据和没有数据两种情况
  appendElement(arr: any[]) {
    arr.forEach((item: any) => {
      const { text, color, line } = item;
      let danmu;
      if (this.dispPool.length > 0) {
        danmu = this.dispPool.shift();
      } else {
        danmu = document.createElement("div");
        danmu.className = "danmaku-item";
      }
      danmu.style.display = "block";
      danmu.style.color = color;
      danmu.style.top = `${(100 / this.trackNum) * line}%`;
      danmu.style.opacity = this.opacity.toString();
      danmu.setAttribute("data-line", line);
      danmu.style.left = "100%";
      danmu.innerHTML = text;
      this.element.appendChild(danmu);
      this.danmakuPool.push(danmu);
    });
  }
  // 获取弹幕轨道
  getTrack() {
    const trueIndexes: number[] = [];
    this.trackArray.forEach((item, index) => {
      if (item) {
        trueIndexes.push(index);
      }
    });
    if (trueIndexes.length === 0) {
      return Math.floor(Math.random() * this.trackNum);
    }
    const randomIndex = Math.floor(Math.random() * trueIndexes.length);
    const selectedTrack = trueIndexes[randomIndex];
    this.trackArray[selectedTrack] = false;
    return selectedTrack;
  }
}
