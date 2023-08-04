import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import VolumeSlider from "./Slide";
import VolumeButton from "./volume";

class volume extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "toolButton volume" });
        new VolumeButton(this.element, video);
        new VolumeSlider(this.element, video);
    }
}
export default volume;