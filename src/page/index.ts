import Loading from "@/components/loading";
import ToolBar from "@/components/ToolBar";
import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
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
        new ToolBar(this.element, video,this ,this.options);
        new Loading(this.element, video)
    }
    initEvent() {
        Component.eventHub.emit(PLAY_EVENT.ISHIDE, true)

        this.element.onmousemove = () => {
            this.changePasue();
        }

        // 监听按键事件
        document.onkeydown = (e) => {
            if (e.code === 'Space') {
                Component.eventHub.emit(PLAY_EVENT.ISPAUSE, !this.isPause);
            }else if(e.code === 'ArrowUp'){
                Component.eventHub.emit(PLAY_EVENT.FIXEDSOUNDCHANGE,5);
            }else if(e.code === 'ArrowDown'){
                Component.eventHub.emit(PLAY_EVENT.FIXEDSOUNDCHANGE,-5);
            }else if(e.code === 'ArrowLeft'){
                Component.eventHub.emit(PLAY_EVENT.FORWARD,-5);
            }else if(e.code === 'ArrowRight'){
                Component.eventHub.emit(PLAY_EVENT.FORWARD,5);
            }
        }
    }

    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.ISPAUSE, (isPause: boolean) => {
            this.isPause = isPause;
            this.changePasue();
        })
    }

    changePasue(){
        clearTimeout(this.timer);
        Component.eventHub.emit(PLAY_EVENT.ISHIDE, true);
        if(this.isPause) return;
        this.timer = setTimeout(() => {
            Component.eventHub.emit(PLAY_EVENT.ISHIDE, false);
        }, 2000)
    }
}

export { Player };