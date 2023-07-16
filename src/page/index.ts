import ToolBar from "@/components/ToolBar";
import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";

class Player extends Component {

    options: playerOptions;

    constructor(options: playerOptions) {
        super(options.el, 'div', { class: 'video-container' });
        this.options = options;
        this.init();
    }
    init() {
        const video = new Video({
            el: this.element,
            url: this.options.url
        })
        new ToolBar(this.element, video);
    }
}

export { Player };