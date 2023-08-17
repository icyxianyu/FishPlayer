import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { Player } from "@/page";

export class BuffererBar extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'buffered-bar' });
        this.initEvent(video);
    }
    initEvent(video: Video) {
        const play = video.element as HTMLVideoElement
        setInterval(() => {
            this.element.innerHTML = '';
            for (let i = 0; i < play.buffered.length; i++) {
                const start = play.buffered.start(i);
                const end = play.buffered.end(i);
                const width = (end - start) / play.duration * 100;
                const beginplace = start / play.duration * 100;
                const buffered = new Component(this.element, 'div', { class: 'buffered' });
                buffered.element.style.width = width + '%';
                buffered.element.style.left = beginplace + '%';
            }
        }, 1000)
    }
}
