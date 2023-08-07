import { Video } from "@/player/video";
import { Store } from "@/store";
import { Component } from "@/utils";

class OpacitySet extends Component {
    Slider!: Component;
    CurrentValue!: Component;
    video: Video;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "opacitySet singleItem" });
        this.video = video;
        this.init();
        this.initEvent();
        this.initEventHub();
        this.initOption();
    }

    init() {
        let text = new Component(this.element, "span", { class: "text" });
        text.element.innerText = "不透明度";

        this.Slider = new Component(this.element, "input", {
            class: "slider",
            type: "range",
            min: "0",
            max: "100",
            step: "1"
        });

        this.CurrentValue = new Component(this.element, "span", { class: "value" });
        this.element.appendChild(text.element);
        this.element.appendChild(this.Slider.element);
        this.element.appendChild(this.CurrentValue.element);
    }

    initEvent() {
        this.Slider.element.onchange = (event: Event) => {
            let value = (event.target as HTMLInputElement).value;
            Store.emitOpacityChange(value);
        }
    }

    initEventHub() {
        Store.onOpacityChange((value: string) => {
            this.CurrentValue.element.innerText = value + '%';
            (this.Slider.element as HTMLInputElement).value = value;
        })
    }

    initOption() {
        const { opacity } = this.video.options.danmaku?.initOptions ?? {};
        if (opacity !== undefined) {
            Store.emitOpacityChange(opacity.toString());

        } else {
            Store.emitOpacityChange('100');
        }
    }

}

export default OpacitySet;