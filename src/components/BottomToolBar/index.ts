
import { Store } from "@/store";
import { toolbarHeight, toolbarPadding } from "@/constant/px";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import BottomWrap from "./BottomWrap";
import TopWrap from "./TopWrap";
import Message from "../message";

class ToolBar extends Component {

    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'bottom-toolbar toolbar' });
        const { progress = true } = video.options?.control ?? {};
        new Message(this.element, video, Player);

        if (progress)
            new TopWrap(this.element, video, Player);

        new BottomWrap(this.element, video, Player);

        this.initEventHub();
        this.initEvent(video)
    }

    initEvent(video: Video) {
        this.element.style.display = 'none';

        video.element.onloadedmetadata = () => {
            this.element.style.display = 'flex';
        }
    }

    initEventHub() {
        Store.onIsHide((isShow: boolean) => {
            this.element.style.height = isShow ? `${toolbarHeight}px` : '0px';
            this.element.style.padding = isShow ? `${toolbarPadding}px` : '0px';
        })
    }
}

export default ToolBar;