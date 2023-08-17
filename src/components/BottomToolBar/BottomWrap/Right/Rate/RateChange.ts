import { Store } from "@/store";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";

export class RateChange extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'RateChange' });
        this.element.innerHTML = `倍数`;
        this.initEventHub();
        this.init(video);
    }
    init(video: Video) {
        const { initRate } = video.options;
        if (initRate)
            Store.emitRateChange(initRate);
    }

    initEventHub() {
        Store.onRateChange((rate: number) => {
            if (rate === 1) {
                this.element.innerHTML = `倍数`;
            } else {
                this.element.innerHTML = `${rate} x`;
            }
        })
    }

}
