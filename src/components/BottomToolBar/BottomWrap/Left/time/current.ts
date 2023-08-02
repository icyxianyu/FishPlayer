import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { timeToMinutes } from "@/utils/time";
import { Store } from "@/store";

class Current extends Component {
    player: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "current" });
        this.player = video.element as HTMLVideoElement;
        this.element.innerHTML = timeToMinutes('0');
        this.initEventHub();
    }
    initEventHub() {
        Store.onTimeUpdate((time: string) => {
            this.element.innerHTML = timeToMinutes(time);
        })
    }

}
export default Current;