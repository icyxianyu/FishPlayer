
import PLAY_EVENT from "@/constant/event";
import { toolbarHeight, toolbarPadding } from "@/constant/px";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";
import BottomWrap from "./BottomWrap";
import TopWrap from "./TopWrap";

class ToolBar extends Component {

    constructor(container: HTMLElement, video: Video, Player: Player, options: playerOptions) {
        super(container, 'div', { class: 'video-toolbar' });
        new TopWrap(this.element, video, Player, options);
        new BottomWrap(this.element, video, Player, options);
        this.initEventHub();
    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.ISHIDE, (isShow:boolean) => {
            this.element.style.height = isShow ? `${toolbarHeight}px` : '0px';
            this.element.style.padding = isShow ? `${toolbarPadding}px` : '0px';
        })
    }
}

export default ToolBar;