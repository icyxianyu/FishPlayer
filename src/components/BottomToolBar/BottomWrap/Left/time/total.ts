import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { timeToMinutes } from "@/utils/time";
class Total extends Component {
    player: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "total" });
        this.player = video.element as HTMLVideoElement;
        this.element.innerHTML = '00:00'
        this.init();
    }
    init() {
        this.player.oncanplay = () => {
            this.element.innerHTML = timeToMinutes(this.player.duration);
        }
    }
}
export default Total;