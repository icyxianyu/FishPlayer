import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import Current from "./current";
import Total from "./total";

class TimeBar extends Component{
    player: HTMLVideoElement;
    video: Video;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", {class: "time-bar"});
        this.video = video;
        this.player = video.element as HTMLVideoElement;
        this.init();
    }
    init(){
        new Current(this.element, this.video);
        this.element.appendChild(document.createTextNode("/"));
        new Total(this.element, this.video);
    }
}
export default TimeBar;
