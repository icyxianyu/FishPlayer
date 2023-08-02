import mp4Player from "@/mp4/mp4Play";
import Store from "@/store";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";
class Video extends Component {
    player: HTMLVideoElement;
    options: playerOptions;
    mediaSource!: MediaSource;

    constructor(container: HTMLElement, options: playerOptions) {
        super(container, 'video', { class: 'fish-video' });
        this.player = this.element as HTMLVideoElement;
        this.options = options;
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
    }
    initEvent() {

        //监听播放事件
        this.player.ontimeupdate = () => {
            Store.emitTimeUpdate(this.player.currentTime);
        }

        //监听点击事件
        this.player.onclick = () => {
            Store.emitIsPause(!this.player.paused);
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