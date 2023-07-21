import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { Player } from "@/page";
import PLAY_EVENT from "@/constant/event";

class CurrentButton extends Component {
    parentNode: HTMLElement;
    player: HTMLVideoElement;
    isDrag!: boolean;
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'currentButton' });
        this.parentNode = container;
        this.player = video.element as HTMLVideoElement;
        this.initEvent();
        this.initEventHub();
    }
    initEvent() {

    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.ISDRAG, (isDrag: boolean) => {
            this.isDrag = isDrag;
        })

        Component.eventHub.on(PLAY_EVENT.MOUSEMOVE, (place: number) => {
            if (this.isDrag)
                this.element.style.left = `${place}px`;
        })
        Component.eventHub.on(PLAY_EVENT.TIMEUPDATE, (time: number) => {
            //获取当前播放时长，更新进度条
            if (!this.isDrag) {
                const persent = time / this.player.duration;
                const { width } = this.parentNode.getBoundingClientRect();
                this.element.style.left = `${persent * width}px`;
            }
        })
        Component.eventHub.on(PLAY_EVENT.MOUSECLICK, (persent: number) => {
            if (this.isDrag) {
                const { width } = this.parentNode.getBoundingClientRect();
                this.element.style.left = `${persent * width}px`;
            }
        })
    }

}

export default CurrentButton;