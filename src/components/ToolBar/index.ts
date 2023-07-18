
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
    }
}

export default ToolBar;