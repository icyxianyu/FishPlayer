import { Video } from "@/player/video";
import { Player } from "@/page";
import { Component, createSVG } from "@/utils";
import { Store } from "@/store";
import { volumeIcon, volumeOffIcon } from "@/constant";

class MobileVolume extends Component {
    video: HTMLVideoElement;
    volumebutton!: SVGSVGElement;
    vlomeoffbutton!: SVGSVGElement;
    SliderBar!: Component;
    SliderBarContainer!: Component;
    timer!: NodeJS.Timeout;
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'mobileVolume' });
        this.video = video.element as HTMLVideoElement;
        this.init();
        this.initEventHub()

    }

    init() {
        this.volumebutton = createSVG(volumeIcon, '0 -2 ,24,24');
        this.vlomeoffbutton = createSVG(volumeOffIcon, '0 -2 ,24,24');
        this.element.appendChild(this.volumebutton);
        this.SliderBarContainer = new Component(this.element, 'div', { class: 'SliderBarContainer' });
        this.SliderBar = new Component(this.SliderBarContainer.element, 'div', { class: 'SliderBar' });
        this.element.style.display = 'none';
    }
    initEventHub() {
        Store.onSoundChange((value: number) => {
            clearTimeout(this.timer);
            this.SliderBar.element.style.width = value + '%';
            this.element.style.display = 'flex';
            this.timer = setTimeout(() => {
                this.element.style.display = 'none';
            }, 1000)
        })
    }

}

export default MobileVolume;