import { webFullScreen, outFullScreen } from "@/constant";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { Store } from "@/store";

export class WebFullScreen extends Component {
    Player: Player;
    MiniScreenButton!: SVGSVGElement;
    FullScreenButton!: SVGSVGElement;
    isFull: boolean = false;
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolButton web-full-screen icon" });
        this.Player = Player;

        this.initIcon();
        this.initEvent();
    }

    initIcon() {
        this.FullScreenButton = createSVG(webFullScreen, '-2 -2 24 24');
        this.MiniScreenButton = createSVG(outFullScreen, '-2 -2 24 24');
        this.createText("网页全屏");
        this.element.appendChild(this.FullScreenButton);
        this.element.appendChild(this.MiniScreenButton);
        this.MiniScreenButton.style.display = "none";
    }

    initEvent() {
        this.element.onclick = () => {
            this.changeFull();
            this.changeIcon();
        }
    }

    changeIcon() {
        if (this.isFull) {
            this.FullScreenButton.style.display = "none";
            this.MiniScreenButton.style.display = "block";
            this.changeText("退出网页全屏");
        } else {
            this.FullScreenButton.style.display = "block";
            this.MiniScreenButton.style.display = "none";
            this.changeText("网页全屏");
        }
    }

    changeFull() {
        if (this.isFull) {
            this.Player.element.classList.remove("web-fullscreen");
        } else {
            this.Player.element.classList.add("web-fullscreen");
        }
        this.isFull = !this.isFull;
    }
}