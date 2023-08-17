
import { Player } from "@/page";
import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import { Component } from "@/utils";
import {CenterContainer} from "./Center";
import {LeftContainer} from "./Left";
import {RightContainer} from "./Right";

export class BottomWrap extends Component {

    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'bottomWrap' });
        new LeftContainer(this.element, video, Player);
        new CenterContainer(this.element, video, Player);
        new RightContainer(this.element, video, Player);
    }
}
