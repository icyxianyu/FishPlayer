import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import Modal from "@/utils/model";

class VolumeSlider extends Modal  {
    constructor(container: HTMLElement, video: Video) {
        super(container, "input",
            {
                class: "volume-slider",
                type: "range",
                min: "0",
                max: "100",
                step: "1"
            });
        this.initStyle();
        this.initEvent();
        this.initEventHub();

    }
    initStyle() {
        this.element.style.top = "-300%";
        this.element.style.transform = "translate(-50%) rotate(270deg)";
        this.element.style.transition = "all 0.5s";
    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.SOUNDCHANGE, (value: number) => {
            (this.CurrentElement as HTMLInputElement).value =  value.toString();
        });
    }
    initEvent() {
        this.CurrentElement.addEventListener("input", (event) => {
            const target = event.target as HTMLInputElement;
            Component.eventHub.emit(PLAY_EVENT.SOUNDCHANGE, parseInt(target.value));
        });    
    }
}

export default VolumeSlider;