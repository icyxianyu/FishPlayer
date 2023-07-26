
import PLAY_EVENT from "@/constant/event";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";
import getOffSetX from "@/utils/offsetX";
import CurrentButton from "./current";
import HoverContainer from "./hovercontainer/hoverContainer";
import ProgressBar from "./ProgressBar";


class TopWrap extends Component {
    isDrag: boolean | undefined;
    constructor(container: HTMLElement, video: Video, Player: Player, options: playerOptions) {
        super(container, 'div', { class: 'topWrap' });
        new ProgressBar(this.element,video,Player);
        new CurrentButton(this.element, video, Player);
        new HoverContainer(this.element,video);
        this.initEvent();
        this.initEventHub();
    }
    initEvent() {
        this.element.onmousedown = (e: MouseEvent) => {
            Component.eventHub.emit(PLAY_EVENT.ISDRAG, true);
        }

        this.element.onmouseup = (e: MouseEvent) => {
            this.changeCurrent(e);
        }

        this.element.onmousemove = (e: MouseEvent) => {
            const offsetX = getOffSetX(e, this.element)
            const { width } = this.element.getBoundingClientRect();
            Component.eventHub.emit(PLAY_EVENT.MOUSEMOVE, offsetX, width);
        }          

        this.element.onmouseenter = (e: MouseEvent) => {
            Component.eventHub.emit(PLAY_EVENT.MOUSELEAVE, false);
        }

        this.element.onmouseleave = (e: MouseEvent) => {
            if(this.isDrag)
            this.changeCurrent(e);
            Component.eventHub.emit(PLAY_EVENT.MOUSELEAVE, true);
        }

    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.ISDRAG, (isDrag:boolean) => {
            this.isDrag = isDrag;
        })
    }

    changeCurrent(e: MouseEvent) {
        const offsetX = getOffSetX(e, this.element)
        const { width } = this.element.getBoundingClientRect();
        Component.eventHub.emit(PLAY_EVENT.ISDRAG, false);
        Component.eventHub.emit(PLAY_EVENT.MOUSECLICK, offsetX / width);
        
    }
}

export default TopWrap;