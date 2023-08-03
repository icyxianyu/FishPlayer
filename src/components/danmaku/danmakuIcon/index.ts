import { danmakuPath$1, danmakuPath$2 } from "@/constant";
import { Store } from "@/store";
import { Component, createSVG } from "@/utils";

class Danmaku extends Component {
    isShow: boolean;
    svg1: SVGSVGElement;
    svg2: SVGSVGElement;
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'danmakuIcon icon' });
        this.isShow = true;
        this.svg1 = createSVG(danmakuPath$1);
        this.svg2 = createSVG(danmakuPath$2);
        this.element.appendChild(this.svg1);
        this.initEvent();
        this.initEventHub();
    }

    initEvent() {
        this.element.onclick = () => {
            Store.emitDanmu(!this.isShow);
        }
    }

    initEventHub() {
        Store.onDanmu((isShow: boolean) => {
            this.isShow = isShow;
            this.element.innerHTML = "";
            if (isShow) {
                this.element.appendChild(this.svg1);
            } else {
                this.element.appendChild(this.svg2);
            }
        })
    }
}

export default Danmaku;