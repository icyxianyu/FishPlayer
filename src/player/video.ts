import mp4Player from "@/mp4/mp4Play";
import { Player } from "@/page";
import { Store } from "@/store";
import { playerOptions } from "@/types/player";
import { Component } from "@/utils/createElement";
import Env from "@/utils/Env";
class Video extends Component {
    player: HTMLVideoElement;
    options: playerOptions;
    mediaSource!: MediaSource;
    Env: boolean;
    scale!: string;

    constructor(container: HTMLElement, options: playerOptions) {
        super(container, 'video', { class: 'fish-video' });
        this.player = this.element as HTMLVideoElement;
        this.options = options;
        this.Env = Env();
        this.initEventHub();
        this.initEvent();
        this.initOption();
        this.initMobile();
        this.init();
    }
    init() {
        const { stream, url } = this.options;
        // 根据 url 判断是不是MP4
        const isMp4 = url.match(/\.mp4$/) ? true : false;
        if (isMp4) {
            if (stream) {
                new mp4Player(url, this.player);
            } else
                this.player.src = url;
        }
        this.player.crossOrigin = 'anonymous';
    }
    initEvent() {

        //监听播放事件
        this.player.ontimeupdate = () => {
            Store.emitTimeUpdate(this.player.currentTime);
        }

        if (this.Env) {
            this.player.ondblclick = () => {
                Store.emitIsPause(!this.player.paused);
            }
        } else {
            this.player.onclick = () => {
                Store.emitIsPause(!this.player.paused);
            }
        }

        //播放结束
        this.player.onended = () => {
            Store.emitIsPause(true);
        }

        // 加载事件
        this.player.onwaiting = (en: Event): any => {
            Store.emitWaiting(true);
        }
        // 加载完成事件
        this.player.onplaying = (en: Event): any => {
            Store.emitWaiting(false);
        }

        //初次加载获取视频信息事件
        this.player.onloadedmetadata = (en: Event): any => {
            Store.emitWaiting(false);
        }
        this.player.onloadeddata = (en: Event): any => {
            Store.emitWaiting(false);
        }


        // 可以播放事件
        this.player.oncanplay = (en: Event): any => {
            Store.emitCanPlay(true);
        }

        this.player.onseeking = (en: Event): any => {
            Store.emitWaiting(true);
        }

        this.player.onseeked = (en: Event): any => {
            Store.emitWaiting(false);
        }

    }

    initEventHub() {

        Store.onSoundChange((value: number) => {
            this.player.volume = value / 100;
        })

        Store.onFixedSoundChange((value: number) => {
            let volume = this.player.volume * 100 + value;

            if (volume > 100) {
                volume = 100;
            } else if (volume < 0) {
                volume = 0;
            }
            Store.emitSoundChange(volume);
        })

        Store.onMouseClick((persent: number) => {
            this.player.currentTime = this.player.duration * persent;
        })

        Store.onRateChange((rate: number) => {
            this.player.playbackRate = rate;
        })

        Store.onIsPause((isPause: boolean) => {
            if (isPause) {
                this.player.pause();
            } else {
                this.player.play();
            }
        })

        Store.onForward((value: number) => {
            this.player.currentTime += value;
        })

        Store.onScaleChange((scale: string) => {
            this.player.style.height = '100%';
            const offsetHeight = this.player.offsetHeight;
            if (scale === '自动') {
                // 获取视频信息中的比例
                this.player.style.width = `${offsetHeight * 16 / 9}px`;
                this.player.style.scale = '自动';
            }
            else if (scale === '16:9') {
                //修改视频比例
                this.player.style.width = `${offsetHeight * 16 / 9}px`;
                this.player.style.scale = '16:9';
            }
            else if (scale === '4:3') {
                //修改视频比例
                this.player.style.width = `${offsetHeight * 4 / 3}px`;
                this.player.style.scale = '4:3';
            }
            this.scale = scale;
        })

        Store.onLoopChange((isLoop: boolean) => {
            this.player.loop = isLoop;
        })

        Store.onMirrorChange((isMirror: boolean) => {

            if (isMirror) {
                this.player.style.transform = 'translate(-50%, -50%) rotateY(180deg)';
            } else {
                this.player.style.transform = 'translate(-50%, -50%) rotateY(0deg)';
            }
        })
    }

    initOption() {
        const { initVolumne, initRate } = this.options;

        if (initVolumne !== undefined) {
            Store.emitSoundChange(initVolumne);
        }

        if (initRate) {
            Store.emitRateChange(initRate);
        }
    }

    initMobile() {
        if (this.Env) {
            this.element.setAttribute('playsinline', 'true');
            this.element.setAttribute('x5-video-player-type', 'h5');
        }
    }
}

export { Video } 