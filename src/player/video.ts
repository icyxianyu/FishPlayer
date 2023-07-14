import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";

class Video extends Component {
    options: playerOptions;
    
    constructor(options: playerOptions) {
        super(options.el,'video',{className:'fish-video'});
        this.options = options;
        this.init();
    }
    init(){
        if (this.element instanceof HTMLVideoElement) {
            this.element.src = this.options.url;
        }
    }
}

export { Video } 