import { danmakuSet } from "@/constant";
import { Store } from "@/store";
import { Component, createSVG } from "@/utils";

class DanmakuSet extends Component {
    svg: SVGSVGElement;
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'toolButton danmakuSet icon' });
        this.svg = createSVG(danmakuSet);
        this.element.appendChild(this.svg);
        this.initEvent();
        this.initEventHub();
    }

    initEvent() {

    }

    initEventHub() {

    }
}

export default DanmakuSet;