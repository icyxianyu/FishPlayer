
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import LeftContainer from "./Left";

class ToolBar extends Component{

    constructor(container: HTMLElement, video:Video) {
        super(container,'div',{className:'video-toolbar'});
        new LeftContainer(this.element,video);
    }
}

export default ToolBar;