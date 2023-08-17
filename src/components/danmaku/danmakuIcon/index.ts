import { danmakuPath$1, danmakuPath$2 } from "@/constant";
import { Store } from "@/store";
import { Component, createSVG } from "@/utils";

export class Danmaku extends Component {
    isShow: boolean;
    svg1: SVGSVGElement;
    svg2: SVGSVGElement;
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'toolButton danmakuIcon icon' });
        this.isShow = true;
        this.svg1 = createSVG(danmakuPath$1);
        this.svg2 = createSVG(danmakuPath$2);
        this.element.appendChild(this.svg1);
        this.element.appendChild(this.svg2);
        this.svg2.style.display = "none";
        this.createText("关闭弹幕");
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
            if (isShow) {
                this.svg2.style.display = "none";
                this.svg1.style.display = "block";
                this.changeText("打开弹幕");
            } else {
                this.changeText("关闭弹幕");
                this.svg1.style.display = "none";
                this.svg2.style.display = "block";
            }
        })
    }
}
