import mp4Player from "@/mp4/mp4Play";
import { Store } from "@/store";
import { playerOptions } from "@/types/player";
import { Component } from "@/utils/createElement";
import Env from "@/utils/Env";
class Video extends Component {
    player: HTMLVideoElement;
    options: playerOptions;
    mediaSource!: MediaSource;
    Env: boolean;

    constructor(container: HTMLElement, options: playerOptions) {
        super(container, 'video', { class: 'fish-video' });
        this.player = this.element as HTMLVideoElement;
        this.options = options;
        this.Env = Env();
        this.init();
        this.initEvent();
        this.initEventHub();
        this.initOption();

    }
    init() {
        const { stream, url } = this.options;
        if (stream) {
            new mp4Player(url, this.player);
        } else
            this.player.src = url;
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
        this.element.oncanplay = (en: Event): any => {
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

            if (scale === '自动') {
                //修改视频比例
                this.player.style.height = 'auto';
                this.player.style.width = '100%';
            }
            else if (scale === '16:9') {
                //修改视频比例
                this.player.style.width = '100%';
                const offsetWidth = this.player.offsetWidth;
                this.player.style.height = `${offsetWidth * 9 / 16}px`;
            }
            else if (scale === '4:3') {
                //修改视频比例
                this.player.style.height = '100%';
                const offsetHeight = this.player.offsetHeight;
                this.player.style.width = `${offsetHeight * 4 / 3}px`;
            }
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
}

export { Video } 