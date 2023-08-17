import { danmakuSet } from "@/constant";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { Component, createSVG } from "@/utils";
import {DanmakuSetContainer} from "./setContainer";

export class DanmakuSet extends Component {
    svg: SVGSVGElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'toolButton danmakuSet icon' });
        this.svg = createSVG(danmakuSet);
        this.element.appendChild(this.svg);
        new DanmakuSetContainer(this.element,video);
    }
}
