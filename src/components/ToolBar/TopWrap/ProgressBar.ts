import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";

class progress extends Component {
    parentNode: HTMLElement;
    video: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'progress' });
        this.parentNode = container as HTMLElement;
        this.video= video.element as HTMLVideoElement
        this.initEventHub();
    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.TIMEUPDATE, (time:number) => {
            const { width } = this.parentNode.getBoundingClientRect();
            const persent = time / this.video.duration;
            console.log(persent,width)
            this.element.style.width = `${persent * width}px`;
        })
    }

}
class ProgressBar extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'progress-bar' });
        new progress(this.element, video);
    }
}
export default ProgressBar;