import { fullScreenIcon, miniScreenIcon } from "@/constant";
import { Player } from "@/page";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { enterFull, exitFull, FullHTMLElement } from "@/utils/full";

class FullScreen extends Component {

    FullScreenButton!: SVGSVGElement;
    MiniScreenButton!: SVGSVGElement;
    Player: Player;

    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "full-screen icon" });
        this.Player = Player;
        this.initIcon();
        this.initEvent();
    }

    initIcon() {
        this.FullScreenButton = createSVG(fullScreenIcon);
        this.MiniScreenButton = createSVG(miniScreenIcon);
        this.element.appendChild(this.FullScreenButton);
    }

    initEvent() {
        this.element.addEventListener("click",this.exchange.bind(this) );
        // 监听全屏事件
        document.addEventListener("fullscreenchange",this.changeIcon.bind(this));
    }

    exchange() {
        this.element.innerHTML = "";
        if (document.fullscreenElement) {
            exitFull();
            this.element.appendChild(this.FullScreenButton);
        }else{
            enterFull(this.Player.element as FullHTMLElement);
            this.element.appendChild(this.MiniScreenButton);
        }
    }

    changeIcon(){
        this.element.innerHTML = "";
        if (document.fullscreenElement) {
            this.element.appendChild(this.MiniScreenButton);
        }else{
            this.element.appendChild(this.FullScreenButton);
        }
    }

}
export default FullScreen;