import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { timeToMinutes } from "@/utils/time";

class Current extends Component{
    player: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", {class: "current"});
        this.player = video.element as HTMLVideoElement;
        this.element.innerHTML = timeToMinutes('0');
        this.initEventHub();
    }
    initEventHub(){
        Component.eventHub.on(PLAY_EVENT.TIMEUPDATE,(time:string)=>{
            this.element.innerHTML = timeToMinutes(time);
        })
    }

}
export default Current;