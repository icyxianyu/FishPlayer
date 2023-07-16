import PLAY_EVENT from "@/constant/event";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";

class Video extends Component {
    options: playerOptions;
    player: HTMLVideoElement;
    
    constructor(options: playerOptions) {
        super(options.el,'video',{class:'fish-video'});
        this.player = this.element as HTMLVideoElement;
        this.options = options;
        this.init();
        this.initEventHub();
    }
    init(){
        if (this.element instanceof HTMLVideoElement) {
            this.element.src = this.options.url;
        }
    }
    initEventHub(){
        Component.eventHub.on(PLAY_EVENT.SOUNDCHANGE,(value:number)=>{
            this.player.volume = value/100;
        })
    }  
}

export { Video } 