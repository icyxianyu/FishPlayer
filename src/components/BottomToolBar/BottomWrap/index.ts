
import { Player } from "@/page";
import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import { Component } from "@/utils/createElement";
import CenterContainer from "./Center";
import LeftContainer from "./Left";
import RightContainer from "./Right";

class ButtomWrap extends Component {

    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'bottomWrap' });
        new LeftContainer(this.element, video, Player);
        new CenterContainer(this.element, video, Player);
        new RightContainer(this.element, video, Player);
    }
}

export default ButtomWrap;