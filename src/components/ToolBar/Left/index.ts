
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import PlayButton from "./play";
import Volume from "./volume";

class LeftContainer extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", {class: "toolbox-container left"});
        new PlayButton(this.element, video);
        new Volume(this.element, video);
    }
}

export default LeftContainer;