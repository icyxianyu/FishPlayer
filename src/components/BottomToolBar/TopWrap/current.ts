import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { Player } from "@/page";
import { Store } from "@/store";
export class CurrentButton extends Component {
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

        Store.onIsDrag((isDrag: boolean) => {
            this.isDrag = isDrag;
        })

        Store.onMouseMove((place: number) => {
            if (this.isDrag)
                this.element.style.left = `${place}px`;
        })

        Store.onTimeUpdate((time: number) => {
            //获取当前播放时长，更新进度条
            if (!this.isDrag) {
                const persent = time / this.player.duration;
                const { width } = this.parentNode.getBoundingClientRect();
                this.element.style.left = `${persent * width}px`;
            }
        })

        Store.onMouseClick((persent: number) => {
            const { width } = this.parentNode.getBoundingClientRect();
            this.element.style.left = `${persent * width}px`;
        })

    }

}
