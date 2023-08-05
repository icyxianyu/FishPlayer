import Loading from "@/components/loading";
import BottomToolBar from "@/components/BottomToolBar";
import TopToolBar from "@/components/TopToolBar";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { playerOptions } from "@/types/player";
import { Component } from "@/utils/createElement";
import danmaku from "@/components/danmaku";
import Message from "@/components/message";

class Player extends Component {

    options: playerOptions;
    timer: any;
    isPause: boolean;
    video: Video;

    constructor(options: playerOptions) {
        super(options.el, 'div', { class: 'video-container' });
        this.video = new Video(this.element, options);
        this.options = options;
        this.timer = null;
        this.isPause = true;
        this.init();
        this.initEvent();
        this.initEventHub();

        return this.proxyEvent();
    }
    init() {
        const { width, height, isShowControl } = this.options;
        if (width)
            this.element.style.width = width + 'px';
        if (height)
            this.element.style.height = height + 'px';


        if (isShowControl) {
            new danmaku(this.element, this.video, this)
            new BottomToolBar(this.element, this.video, this);
            new TopToolBar(this.element, this.video, this)
        }
        new Loading(this.element, this.video)
    }
    initEvent() {
        Store.emitIsHide(true);
        this.element.onmousemove = () => {
            this.changePasue();
        }

        // 监听按键事件
        document.onkeydown = (e) => {
            if (e.code === 'Space') {
                Store.emitIsPause(!this.isPause);
            } else if (e.code === 'ArrowUp') {
                Store.emitMessage('音量增加')
                Store.emitFixedSoundChange(5);
            } else if (e.code === 'ArrowDown') {
                Store.emitMessage('音量减少')
                Store.emitFixedSoundChange(-5);
            } else if (e.code === 'ArrowLeft') {
                Store.emitMessage('快退5s')
                Store.emitForward(-5);
            } else if (e.code === 'ArrowRight') {
                Store.emitMessage('快进5s')
                Store.emitForward(5);
            }
        }
    }

    initEventHub() {
        Store.onIsPause((isPause: boolean) => {
            this.isPause = isPause;
            this.changePasue();
        })
    }

    changePasue() {
        clearTimeout(this.timer);
        Store.emitIsHide(true);
        if (this.isPause) return;
        this.timer = setTimeout(() => {
            Store.emitIsHide(false);
        }, 2000)
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
            }
        })
    }
}


export { Player };