import Loading from "@/components/loading";
import ToolBar from "@/components/ToolBar";
import { Video } from "@/player/video";
import Store from "@/store";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";

class Player extends Component {

    options: playerOptions;
    timer: any;
    isPause: boolean;

    constructor(options: playerOptions) {
        super(options.el, 'div', { class: 'video-container' });
        this.options = options;
        this.timer = null;
        this.isPause = true;
        this.init();
        this.initEvent();
        this.initEventHub();
    }
    init() {
        const video = new Video({
            el: this.element,
            url: this.options.url
        })
        new ToolBar(this.element, video, this);
        new Loading(this.element, video)
    }
    initEvent() {
        Store.emitIsHide(true);
        this.element.onmousemove = () => {
            this.changePasue();
        }

        // 监听按键事件
        document.onkeydown = (e) => {
            if (e.code === 'Space') {
                Store.emitIsPause(!this.isPause);
            }else if(e.code === 'ArrowUp'){
                Store.emitFixedSoundChange(5);
            }else if(e.code === 'ArrowDown'){
                Store.emitFixedSoundChange(-5);
            }else if(e.code === 'ArrowLeft'){
                Store.emitForward(-5);
            }else if(e.code === 'ArrowRight'){
                Store.emitForward(5);
            }
        }
    }

    initEventHub() {
        Store.onIsPause((isPause: boolean) => {
            this.isPause = isPause;
            this.changePasue();
        })
    }

    changePasue(){
        clearTimeout(this.timer);
        Store.emitIsHide(true);
        if(this.isPause) return;
        this.timer = setTimeout(() => {
            Store.emitIsHide(false);
        }, 2000)
    }
}

export { Player };