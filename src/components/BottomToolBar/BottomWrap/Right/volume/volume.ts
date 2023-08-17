import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import {VolumeSlider} from "./Slide";
import {VolumeButton} from "./volumeButton";

export class Volume extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolButton volume" });
        if (!video.Env) {
            new VolumeButton(this.element, video);
            new VolumeSlider(this.element, video);
        }
    }
}