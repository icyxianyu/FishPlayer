import { webFullScreen, outFullScreen } from "@/constant";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { enterFull, exitFull, FullHTMLElement } from "@/utils/full";

class WebFullScreen extends Component {
    Player: Player;
    MiniScreenButton!: SVGSVGElement;
    FullScreenButton!: SVGSVGElement;
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolButton web-full-screen icon" });
        this.Player = Player;
        this.initIcon();
        this.initEvent();
    }

    initIcon() {
        this.FullScreenButton = createSVG(webFullScreen, '-2 -2 24 24');
        this.MiniScreenButton = createSVG(outFullScreen, '-2 -2 24 24');
        this.element.appendChild(this.FullScreenButton);    
    }

    initEvent() {

    }

    exchange() {
        this.element.innerHTML = "";
        if (document.fullscreenElement) {
            exitFull();
            this.element.appendChild(this.FullScreenButton);
        } else {
            enterFull(this.Player.element as FullHTMLElement);
            this.element.appendChild(this.MiniScreenButton);
        }
    }

    changeIcon() {
        this.element.innerHTML = "";
        if (document.fullscreenElement) {
            this.element.appendChild(this.MiniScreenButton);
        } else {
            this.element.appendChild(this.FullScreenButton);
        }
    }

}
export default WebFullScreen;