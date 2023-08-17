import { LoadingContainer } from "@/components/loading/loadingContainer";
import { BottomToolBar } from "@/components/BottomToolBar/toolBar";
import { TopToolBar } from "@/components/TopToolBar/topToolBar";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { playerOptions } from "@/types/player";
import { Component } from "@/utils/createElement";
import { danmaku } from "@/components/danmaku/danmaku";
import { Message } from "@/components/message";
import { Env } from "@/utils/Env";
import { Mobile } from "@/components/mobile/mobile";
class Player extends Component {
  options: playerOptions;
  timer: any = null;
  isPause: boolean = true;
  video: Video;
  Env: boolean = Env();
  scale: string = "自动";
  constructor(options: playerOptions) {
    super(options.el, "div", { class: "video-container" });
    this.video = new Video(this.element, options);
    this.options = options;
    this.init();
    this.initEvent();
    this.initEventHub();
    this.initMobile();
    this.initObserver();
    this.initPlugin();

    return this.proxyEvent();
  }

  init() {
    const { width, height, isShowControl } = this.options;
    if (width) this.element.style.width = width;
    if (height) this.element.style.height = height;

    if (isShowControl) {
      new danmaku(this.element, this.video, this);
      new BottomToolBar(this.element, this.video, this);
      new TopToolBar(this.element, this.video, this);
    }
    new LoadingContainer(this.element, this.video);
  }
  initEvent() {
    Store.emitIsHide(true);
    if (this.Env) {
      this.element.addEventListener("touchmove", () => {
        this.changePasue();
      });
      this.element.addEventListener("click", () => {
        this.changePasue();
      });
    } else {
      this.element.addEventListener("mousemove", () => {
        this.changePasue();
      });
    }

    // 监听按键事件
    document.onkeydown = (e) => {
      if (e.code === "Space") {
        Store.emitIsPause(!this.isPause);
      } else if (e.code === "ArrowUp") {
        Store.emitMessage("音量增加");
        Store.emitFixedSoundChange(5);
      } else if (e.code === "ArrowDown") {
        Store.emitMessage("音量减少");
        Store.emitFixedSoundChange(-5);
      } else if (e.code === "ArrowLeft") {
        Store.emitMessage("快退5s");
        Store.emitForward(-5);
      } else if (e.code === "ArrowRight") {
        Store.emitMessage("快进5s");
        Store.emitForward(5);
      }
    };
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        screen.orientation.lock("landscape");
      } else {
        screen.orientation.unlock();
      }
    });
  }

  initEventHub() {
    Store.onIsPause((isPause: boolean) => {
      this.isPause = isPause;
      this.changePasue();
    });

    Store.onScaleChange((scale: string) => {
      this.scale = scale;
    });
  }

  changePasue() {
    clearTimeout(this.timer);
    Store.emitIsHide(true);
    if (this.isPause) return;
    this.timer = setTimeout(() => {
      Store.emitIsHide(false);
    }, 2000);
  }

  proxyEvent() {
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop in target.video.element) {
          return (target.video.element as any)[prop];
        } else {
          return (target as any)[prop];
        }
      },
      set: (target, prop, value) => {
        if (prop in target.video.element) {
          (target.video.element as any)[prop] = value;
        } else {
          (target as any)[prop] = value;
        }
        return true;
      },
    });
  }

  initMobile() {
    if (this.Env) {
      new Mobile(this.element, this.video, this);
    }
  }

  initObserver() {
    const resizeObserver = new ResizeObserver(() => {
      Store.emitScaleChange(this.scale);
    });
    resizeObserver.observe(this.element);
  }

  initPlugin() {
    const { plugin } = this.options;
    plugin?.forEach((item) => {
      if (plugin) {
        item(this);
      }
    });
  }
}

export { Player };
