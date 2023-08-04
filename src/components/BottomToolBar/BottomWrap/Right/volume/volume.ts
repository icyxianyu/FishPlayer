import { Store } from "@/store";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { volumeIcon, volumeOffIcon } from "@/constant";

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
        this.volumebutton = createSVG(volumeIcon, '0 -2 ,24,24');
        this.vlomeoffbutton = createSVG(volumeOffIcon, '0 -2 ,24,24');
        this.element.appendChild(this.volumebutton);
    }

    initEvent() {
        this.element.addEventListener("click", () => {
            if (this.voice === 0) {
                Store.emitSoundChange(100);
            } else {
                Store.emitSoundChange(0);
            }
        });
    }
    initEventHub() {
        Store.onSoundChange((value: number) => {
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
