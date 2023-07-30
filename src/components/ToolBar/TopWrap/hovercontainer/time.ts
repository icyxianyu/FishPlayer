import Store from "@/store";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { timeToMinutes } from "@/utils/time";

class time extends Component {
    video: Video;
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'timebar' });
        this.video = video;
        this.initEventHub();
    }
    initEventHub() {

        Store.onMouseMove((x: string, width: string) => {
            this.element.innerHTML = timeToMinutes(
                (parseInt(x) / parseInt(width)) *
                (this.video.element as HTMLVideoElement).duration);
        })
    }
}

export default time;