
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { pauseIcon, playIcon } from "@/constant";
import PLAY_EVENT from "@/constant/event";
class PlayButton extends Component {
    play: SVGSVGElement;
    pause: SVGSVGElement;
    player: HTMLVideoElement;

    constructor(container: HTMLElement,video:Video) {
        super(container, "div", { class: "play-button icon" });
        this.play = createSVG(playIcon);
        this.pause = createSVG(pauseIcon);
        this.player = video.element as HTMLVideoElement;
        this.initEvent();
        this.initEventHub();
        this.changeIcon(this.player.paused);
    }

    initEvent(){
        this.element.onclick = ()=>{
            Component.eventHub.emit(PLAY_EVENT.ISPAUSE,!this.player.paused);
        }
    }
    initEventHub(){
        Component.eventHub.on(PLAY_EVENT.ISPAUSE,(isPause:boolean)=>{
            this.changeIcon(isPause);
        })
    }

    changeIcon(isPause:boolean){
        this.element.innerHTML = "";
        if(isPause){
            this.element.appendChild(this.play);
        }else{
            this.element.appendChild(this.pause);
        }
    }
}

export default PlayButton;