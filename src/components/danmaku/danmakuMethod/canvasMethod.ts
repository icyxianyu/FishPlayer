import { Player } from "@/page";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { danmakuOptions } from "@/types/player";
import { Component } from "@/utils/createElement";

interface danmakuPoolItem {
  isInsert: boolean; // 是否已经完全插入
  text: string; // 弹幕内容
  color: string; // 弹幕颜色
  top: number; // 弹幕距离顶部的距离
  left: number; // 弹幕距离左边的距离
  textWidth: number; // 弹幕的宽度
}

class CanvasMethod extends Component {
  opacity: string = "100%";
  trackNum: number = 30;
  player: Player;
  isPause: boolean = true;
  isShow: boolean = true;
  timer!: NodeJS.Timer;
  danmakuOptions: danmakuOptions | undefined;
  video: HTMLVideoElement;
  context: CanvasRenderingContext2D;
  trackArray: boolean[];
  danmakuPool: danmakuPoolItem[] = [];

  constructor(container: HTMLElement, video: Video, player: Player) {
    super(container, "canvas", { class: "danmaku canvasMethod" });
    this.trackArray = new Array(this.trackNum).fill(true);
    this.context = (this.element as HTMLCanvasElement).getContext("2d");
    const { height, width } = this.element.getBoundingClientRect();
    this.context.canvas.height = height;
    this.context.canvas.width = width;

    const { danmaku } = video.options;
    this.danmakuOptions = danmaku;
    this.video = video.element as HTMLVideoElement;
    this.player = player;
    this.initAnimate();
    this.initEventHub();
  }

  initAnimate() {
    const ctx = this;
    function arr() {
      if (!ctx.isPause) {
        ctx.context.clearRect(
          0,
          0,
          (ctx.element as HTMLCanvasElement).width,
          (ctx.element as HTMLCanvasElement).height,
        );

        ctx.danmakuPool.forEach((item: danmakuPoolItem) => {
          ctx.drawText(item);
        });
      }
      requestAnimationFrame(arr);
    }
    requestAnimationFrame(arr);
  }

  drawText(item: danmakuPoolItem) {
    const { textWidth, top, text, color, left, isInsert } = item;
    const { width, height } = this.element.getBoundingClientRect();
    const singleHeight = height / this.trackNum;

    const currentLeft = width - left;

    // 当前弹幕第一次进入视口
    if (currentLeft === width && this.trackArray[top] !== undefined) {
      this.trackArray[top] = true;
    }

    // 当前弹幕完全进入视口
    if (
      currentLeft + textWidth < width &&
      !isInsert &&
      this.trackArray[top] !== undefined
    ) {
      this.trackArray[top] = true;
      item.isInsert = true;
    }
    // 当前弹幕完全离开视口
    if (currentLeft + textWidth < 0) {
      // 将当前数据从弹幕池中移除
      this.danmakuPool = this.danmakuPool.filter(
        (danmu: danmakuPoolItem) => danmu !== item,
      );
      return;
    }

    // 绘制弹幕
    this.context.font = "15px Arial";
    this.context.fillStyle = color;
    this.context.fillText(text, currentLeft, (top + 1) * singleHeight);
    item.left += 1;
  }

  setDanmaku(isPause: boolean, isShow: boolean, isWaiting?: boolean) {
    if (isWaiting) {
      clearInterval(this.timer);
      // 清空当前canvas
      this.context.clearRect(
        0,
        0,
        (this.element as HTMLCanvasElement).width,
        (this.element as HTMLCanvasElement).height,
      );
      this.danmakuPool = [];
      return;
    }

    if (isShow) {
      if (!isPause) {
        this.insert();
      } else {
        clearInterval(this.timer);
      }
    } else {
      clearInterval(this.timer);
      this.context.clearRect(
        0,
        0,
        (this.element as HTMLCanvasElement).width,
        (this.element as HTMLCanvasElement).height,
      );

      this.danmakuPool = [];
    }
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
      this.context.globalAlpha = parseInt(item) / 100;
    });

    Store.onDanmuAreaChange((item: string) => {
      let arrLen = Math.floor((parseInt(item) / 100) * this.trackNum);
      this.trackArray = new Array(arrLen).fill(true);
    });

    Store.onScaleChange(() => {
      const { height, width } = this.element.getBoundingClientRect();
      this.context.canvas.height = height;
      this.context.canvas.width = width;
    });
  }

  insert() {
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
                top: this.getTrack(),
                left: 0,
                textWidth: this.context.measureText(item[i].text).width,
                isInsert: false,
              });
            }
            this.danmakuPool.push(...arr);
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
            top: this.getTrack(),
            left: 0,
            textWidth: this.context.measureText(i + "测试弹幕,测试弹幕").width,
            isInsert: false,
          });
        }
        this.danmakuPool.push(...arr);
      }
    }, interval ?? 500);
  }

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
export { CanvasMethod };
