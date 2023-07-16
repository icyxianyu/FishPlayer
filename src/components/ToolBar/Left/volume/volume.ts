import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { volumeIcon, volumeOffIcon } from "@/utils/svgPath";

class VolumeButton extends Component {

    volumebutton!: SVGSVGElement;
    voice: number;
    player: HTMLVideoElement;
    vlomeoffbutton!: SVGSVGElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "volume-button icon" });
        this.player = video.element as HTMLVideoElement;
        this.initIcon();
        this.initEvent();
        this.initEventHub();
        this.voice = 100;
    }

    initIcon() {
        this.volumebutton = createSVG(volumeIcon);
        this.vlomeoffbutton = createSVG(volumeOffIcon);
        this.element.appendChild(this.volumebutton);
    }

    initEvent() {
        this.element.addEventListener("click", () => {
            if (this.voice === 0) {
                Component.eventHub.emit(PLAY_EVENT.SOUNDCHANGE, 100);
            } else {
                Component.eventHub.emit(PLAY_EVENT.SOUNDCHANGE, 0);
            }
        });
    }
    initEventHub(){
        Component.eventHub.on(PLAY_EVENT.SOUNDCHANGE, (value: number) => {

            this.element.innerHTML = "";
            if (value === 0) {
                this.element.appendChild(this.vlomeoffbutton);
            } else {
                this.element.appendChild(this.volumebutton);
            }
            this.voice = value;
        });
    }
}

export default VolumeButton;
