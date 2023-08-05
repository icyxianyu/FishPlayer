import { fullScreenIcon, miniScreenIcon } from "@/constant";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { enterFull, exitFull, FullHTMLElement } from "@/utils/full";

class FullScreen extends Component {

    FullScreenButton!: SVGSVGElement;
    MiniScreenButton!: SVGSVGElement;
    Player: Player;

    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolButton full-screen icon" });
        this.Player = Player;
        this.initIcon();
        this.initEvent();
    }

    initIcon() {
        this.FullScreenButton = createSVG(fullScreenIcon, '-2 -2 24 24');
        this.MiniScreenButton = createSVG(miniScreenIcon, '-2 -2 24 24');
        this.createText("进入全屏");
        this.element.appendChild(this.FullScreenButton);
        this.element.appendChild(this.MiniScreenButton);
        this.MiniScreenButton.style.display = "none";
    }

    initEvent() {
        this.element.addEventListener("click", this.exchange.bind(this));
        // 监听全屏事件
        document.addEventListener("fullscreenchange", this.changeIcon.bind(this));
    }

    exchange() {
        if (document.fullscreenElement) {
            exitFull();
        } else {
            enterFull(this.Player.element as FullHTMLElement);
        }
        this.changeStyle();
    }

    changeIcon() {
        this.changeStyle()
    }
    changeStyle() {
        if (document.fullscreenElement) {
            this.FullScreenButton.style.display = "none";
            this.MiniScreenButton.style.display = "block";
            this.changeText("退出全屏");
            Store.emitMessage("进入全屏");
        } else {
            this.changeText("进入全屏");
            Store.emitMessage("退出全屏");
            this.FullScreenButton.style.display = "block";
            this.MiniScreenButton.style.display = "none";

        }
    }
}
export default FullScreen;