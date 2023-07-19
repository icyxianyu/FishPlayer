
import PLAY_EVENT from "@/constant/event";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";
import CurrentButton from "./current";
import ProgressBar from "./ProgressBar";


class TopWrap extends Component {
    isDrag: boolean | undefined;
    constructor(container: HTMLElement, video: Video, Player: Player, options: playerOptions) {
        super(container, 'div', { class: 'topWrap' });
        new ProgressBar(this.element)
        new CurrentButton(this.element, video, Player);
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
            const { x } = e;
            Component.eventHub.emit(PLAY_EVENT.MOUSEDRAG, x);
        }

        this.element.onmouseleave = (e: MouseEvent) => {
            if(this.isDrag)
            this.changeCurrent(e);
        }
    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.ISDRAG, (isDrag:boolean) => {
            this.isDrag = isDrag;
        })
    }

    changeCurrent(e: MouseEvent) {
        const { x } = e;
        const { width } = this.element.getBoundingClientRect();
        Component.eventHub.emit(PLAY_EVENT.ISDRAG, false);
        Component.eventHub.emit(PLAY_EVENT.MOUSECLICK, x / width);
        
    }
}

export default TopWrap;