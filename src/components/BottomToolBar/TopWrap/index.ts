
import { Store } from "@/store";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import getOffSetX from "@/utils/offsetX";
import CurrentButton from "./current";
import HoverContainer from "./hovercontainer/hoverContainer";
import ProgressBar from "./ProgressBar";


class TopWrap extends Component {
    isDrag: boolean | undefined;
    Env: boolean;
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'topWrap' });
        this.Env = video.Env;
        new ProgressBar(this.element, video, Player);
        new CurrentButton(this.element, video, Player);
        new HoverContainer(this.element, video);
        this.initEvent();
        this.initEventHub();
    }
    initEvent() {
        if (this.Env) {
            let x: number, w: number;
            this.element.addEventListener('touchstart', (e: Event) => {
                const touchEvent = e as TouchEvent;
                const offsetX = getOffSetX(touchEvent, this.element);
                const { width } = this.element.getBoundingClientRect();
                x = offsetX;
                w = width;
                Store.emitIsDrag(true);
                Store.emitMouseLeave(false);
            });

            this.element.addEventListener('touchmove', (e: Event) => {
                const touchEvent = e as TouchEvent;
                const offsetX = getOffSetX(touchEvent, this.element);
                const { width } = this.element.getBoundingClientRect();
                x = offsetX;
                w = width;
                Store.emitMouseMove(offsetX, width);
            });

            this.element.addEventListener('touchend', (e: Event) => {
                Store.emitMouseLeave(true);
                Store.emitIsDrag(false);
                Store.emitMouseClick(x / w);
            });


        } else {
            this.element.onmousedown = (e: MouseEvent) => {
                Store.emitIsDrag(true);
            }

            this.element.onmouseup = (e: MouseEvent) => {
                this.changeCurrent(e);
            }

            this.element.onmousemove = (e: MouseEvent) => {
                const offsetX = getOffSetX(e, this.element)
                const { width } = this.element.getBoundingClientRect();
                Store.emitMouseMove(offsetX, width);
            }

            this.element.onmouseenter = (e: MouseEvent) => {
                Store.emitMouseLeave(false);
            }
            this.element.onmouseleave = (e: MouseEvent) => {
                if (this.isDrag)
                    this.changeCurrent(e);
                Store.emitMouseLeave(true);
            }
        }
    }
    initEventHub() {

        Store.onIsDrag((isDrag: boolean) => {
            this.isDrag = isDrag;
        })
    }

    changeCurrent(e: MouseEvent | TouchEvent) {

        const offsetX = getOffSetX(e, this.element);
        const { width } = this.element.getBoundingClientRect();
        Store.emitIsDrag(false);
        Store.emitMouseClick(offsetX / width);

    }
}

export default TopWrap;