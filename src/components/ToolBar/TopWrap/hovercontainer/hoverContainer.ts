import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import currentBar from "./currentbar";
import time from "./time";

class HoverContainer extends Component {

    constructor(container: HTMLElement,video:Video) {
        super(container, 'div', { class: 'hover-container' });
        new currentBar(this.element).element as HTMLElement;
        new time(this.element,video);
        this.initEventHub();
    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.MOUSEMOVE, (x:string) => {
            this.element.style.display = 'block';
            this.element.style.left = x+'px';
        })
        Component.eventHub.on(PLAY_EVENT.MOUSELEAVE, (isLeave:boolean) => {
            if(isLeave) {
                this.element.style.display = 'none';
            }
        })
    }
}

export default HoverContainer;