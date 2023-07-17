import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { timeToMinutes } from "@/utils/time";

class Current extends Component{
    player: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", {class: "current"});
        this.player = video.element as HTMLVideoElement;
        this.init();
    }
    init(){
        this.element.innerHTML = timeToMinutes('0');
        this.player.ontimeupdate = () =>{
            this.element.innerHTML = timeToMinutes(this.player.currentTime.toString());
        }
    }

}
export default Current;