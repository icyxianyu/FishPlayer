
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { pauseIcon, playIcon } from "@/utils/svgPath";
class PlayButton extends Component {
    play: SVGSVGElement;
    pause: SVGSVGElement;
    player: HTMLVideoElement;
    playState: boolean;
    constructor(container: HTMLElement,video:Video) {
        super(container, "div", { class: "play-button icon" });
        this.play = createSVG(playIcon);
        this.pause = createSVG(pauseIcon);
        this.player = video.element as HTMLVideoElement;
        this.playState = false;
        this.replaceElement();
        this.initEvent();
    }

    initEvent(){
        this.element.addEventListener("click",()=>{
            this.replaceElement();
        })
    }
    replaceElement(){
        this.element.innerHTML = "";

        if(this.playState){
            this.element.appendChild(this.pause);
            this.playState = false;
            this.player.play();
        }else{
            this.element.appendChild(this.play);
            this.playState = true;
            this.player.pause();

        }
    }
}

export default PlayButton;