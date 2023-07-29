import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import Loading from "./loading";
class LoadingContainer extends Component {
    constructor(container:HTMLElement, video:Video) {
        super(container, 'div', { class: 'loadingContainer' });
        new Loading(this.element,video);
        new Component(this.element,'div',{class:'loadingContainer-text'})
        .element.innerHTML = '正在加载中...';
        
        this.initEventHub();
    }

    initEventHub(){
        Component.eventHub.on(PLAY_EVENT.WAITING,(value:boolean)=>{
            if(value){
                this.element.style.display = 'flex';
            }else{
                this.element.style.display = 'none';
            }
        })
    }
}

export default LoadingContainer;