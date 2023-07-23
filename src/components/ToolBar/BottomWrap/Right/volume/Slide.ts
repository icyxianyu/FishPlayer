import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";

class VolumeSlider extends Component  {
    constructor(container: HTMLElement, video: Video) {
        super(container, "input",
            {
                class: "volume-slider",
                type: "range",
                min: "0",
                max: "100",
                step: "1"
            });
        this.initEvent();
        this.initEventHub();

    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.SOUNDCHANGE, (value: number) => {
            (this.element as HTMLInputElement).value =  value.toString();
        });
    }
    initEvent() {
        this.element.addEventListener("input", (event) => {
            const target = event.target as HTMLInputElement;
            Component.eventHub.emit(PLAY_EVENT.SOUNDCHANGE, parseInt(target.value));
        });    
    }
}

export default VolumeSlider;