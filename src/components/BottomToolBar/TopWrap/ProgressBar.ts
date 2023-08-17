import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { BuffererBar } from "./bufferedBar";
import { Store } from "@/store";

export class progress extends Component {
    parentNode: HTMLElement;
    video: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'progress' });
        this.parentNode = container as HTMLElement;
        this.video = video.element as HTMLVideoElement
        this.initEventHub();
    }
    initEventHub() {
        Store.onTimeUpdate((time: number) => {
            const { width } = this.parentNode.getBoundingClientRect();
            const persent = time / this.video.duration;
            this.element.style.width = `${persent * width}px`;
        })

        Store.onMouseClick((persent: number) => {
            const { width } = this.parentNode.getBoundingClientRect();
            this.element.style.width = `${persent * width}px`;
        })
    }

}
export class ProgressBar extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'progress-bar' });
        new progress(this.element, video);
        new BuffererBar(this.element, video, Player);

    }
}