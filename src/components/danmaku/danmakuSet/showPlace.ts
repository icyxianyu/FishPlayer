import { Player } from "@/page";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { Component } from "@/utils";

class ShowPlace extends Component {
    Slider!: Component;
    CurrentValue!: Component;
    video: Video;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "showPlace singleItem" });
        this.video = video;
        this.init();
        this.initEvent();
        this.initEventHub();
        this.initOption();

    }

    init() {
        let text = new Component(this.element, "span", { class: "text" });
        text.element.innerText = "显示区域";

        this.Slider = new Component(this.element, "input", {
            class: "slider",
            type: "range",
            list: "tickmarks",
        });
        let datalist = new Component(this.Slider.element, "datalist", { id: "tickmarks" });
        for (let i = 0; i < 5; i++) {
            new Component(datalist.element, "option", {
                value: i * 25 + '',
                label: i * 25 + '%'
            });

        }
        this.CurrentValue = new Component(this.element, "span", { class: "value" });
        this.element.appendChild(text.element);
        this.element.appendChild(this.Slider.element);
        this.element.appendChild(this.CurrentValue.element);
    }

    initEvent() {
        this.Slider.element.onchange = (event: Event) => {
            let value = (event.target as HTMLInputElement).value;
            Store.emitDanmuAreaChange(value);
        }
    }

    initEventHub() {
        Store.onDanmuAreaChange((value: string) => {
            this.CurrentValue.element.innerText = value + '%';
            (this.Slider.element as HTMLInputElement).value = value;

        })
    }

    initOption() {
        const { area } = this.video.options.danmaku?.initOptions ?? {};
        if (area !== undefined) {
            Store.emitDanmuAreaChange(area.toString());
        } else {
            Store.emitDanmuAreaChange('100');
        }
    }
}

export default ShowPlace;