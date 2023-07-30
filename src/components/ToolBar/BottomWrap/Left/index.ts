
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import PlayButton from "./play/play";
import TimeBar from "./time/time";
class LeftContainer extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "toolbox-container left" });
        const { pause = true, time = true} = video.options?.control ?? {};
        if (pause)
            new PlayButton(this.element, video);
        if (time)
            new TimeBar(this.element, video);
    }
}

export default LeftContainer;