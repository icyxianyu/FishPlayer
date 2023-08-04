import { smallWindow } from "@/constant";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";

class SmallWindow extends Component {
    Player: Player;
    MiniScreenButton!: SVGSVGElement;
    FullScreenButton!: SVGSVGElement;
    video: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolButton icon smallWindow" });
        this.video = video.element as HTMLVideoElement;
        this.Player = Player;
        if (PictureInPictureWindow) {
            this.element.appendChild(createSVG(smallWindow, '0 0 34 34'));
            this.initEvent();
        }

    }
    initEvent() {
        this.element.onclick = () => {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else {
                if (document.pictureInPictureEnabled) {
                    this.video.requestPictureInPicture();
                }
            }
        }
    }
}
export default SmallWindow;