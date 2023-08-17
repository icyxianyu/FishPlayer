
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { pauseIcon, playIcon } from "@/constant";
import { Store } from "@/store";

export class PlayButton extends Component {
    play: SVGSVGElement;
    pause: SVGSVGElement;
    player: HTMLVideoElement;

    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "toolButton play-button icon" });
        this.play = createSVG(playIcon, '0 -2 ,24,24');
        this.pause = createSVG(pauseIcon, '0 -2 ,24,24');
        this.player = video.element as HTMLVideoElement;
        this.initEvent();
        this.initEventHub();
        this.changeIcon(this.player.paused);
    }

    initEvent() {
        this.element.onclick = () => {
            Store.emitIsPause(!this.player.paused);
        }
    }
    initEventHub() {
        Store.onIsPause((isPause: boolean) => {
            this.changeIcon(isPause);
        })
    }

    changeIcon(isPause: boolean) {
        this.element.innerHTML = "";
        if (isPause) {
            this.element.appendChild(this.play);
        } else {
            this.element.appendChild(this.pause);
        }
    }
}
