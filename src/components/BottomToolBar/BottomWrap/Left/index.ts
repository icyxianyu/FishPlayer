
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import PlayButton from "./play/play";
import TimeBar from "./time/time";
class LeftContainer extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolbox-container left" });
        const { pause = true, time = true } = video.options?.control ?? {};
        const { left } = video.options?.components ?? {};
        if (pause)
            new PlayButton(this.element, video);
        if (time)
            new TimeBar(this.element, video);


        if (left)
            left.forEach((component) => {
                new component(this.element, video, Player);
            })
    }
}

export default LeftContainer;