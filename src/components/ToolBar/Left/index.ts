
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import PlayButton from "./play";

class LeftContainer extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", {className: "left-container"});
        new PlayButton(this.element, video);
    }
}

export default LeftContainer;