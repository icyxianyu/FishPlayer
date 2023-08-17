
import { Store } from "@/store";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { toolbarHeight } from "@/constant/px";
import { Title } from "./title";

export class TopToolBar extends Component {

    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'top-toolbar toolbar' });
        const { top } = video.options.components ?? {};

        new Title(this.element, video, Player);
        if (top)
            top.forEach((item) => {
                new item(this.element, video, Player);
            })
        this.initEventHub();
    }
    initEventHub() {
        Store.onIsHide((isShow: boolean) => {
            this.element.style.top = isShow ? '0px' : `-${toolbarHeight}px`;
        })
    }
}
