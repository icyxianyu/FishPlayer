
import { Player } from "@/page";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import FullScreen from "./fullscreen";
import RateChange from "./Rate/RateChange";
import Volume from "./volume";

class RightContainer extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolbox-container right" });
        new Volume(this.element, video);
        new RateChange(this.element, video);
        new FullScreen(this.element, video, Player);
    }
}

export default RightContainer;