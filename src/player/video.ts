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
        this.initEvent();
        this.initEventHub();
    }
    init(){
        if (this.element instanceof HTMLVideoElement) {
            this.element.src = this.options.url;
        }
    }
    initEvent(){
    
        //监听播放事件
        this.player.ontimeupdate = () =>{
            Component.eventHub.emit(PLAY_EVENT.TIMEUPDATE,this.player.currentTime);
        }
    
        //监听点击事件
        this.player.onclick = () =>{
            Component.eventHub.emit(PLAY_EVENT.ISPAUSE,!this.player.paused);
        }

        //播放结束
        this.player.onended = () =>{
            Component.eventHub.emit(PLAY_EVENT.ISPAUSE,true);
        }

        // 加载事件
        this.player.onwaiting = (en:Event):any =>{
            Component.eventHub.emit(PLAY_EVENT.WAITING,true);
        }

        // 加载完成事件
        this.player.onplaying = (en:Event):any =>{
            Component.eventHub.emit(PLAY_EVENT.WAITING,false);
        }

        
        this.element.oncanplay = (en:Event):any =>{
            Component.eventHub.emit(PLAY_EVENT.CANPLAY,true);
        }
    }

    initEventHub(){
    
        Component.eventHub.on(PLAY_EVENT.SOUNDCHANGE,(value:number)=>{
            this.player.volume = value/100;
        })

        Component.eventHub.on(PLAY_EVENT.FIXEDSOUNDCHANGE,(value:number)=>{
            let volume = this.player.volume * 100 + value;

            if(volume > 100){
                volume = 100;
            }else if(volume < 0){
                volume = 0;
            }

            Component.eventHub.emit(PLAY_EVENT.SOUNDCHANGE,volume);
        })
    
        Component.eventHub.on(PLAY_EVENT.MOUSECLICK,(persent:number)=>{
            this.player.currentTime = this.player.duration * persent;
        })

        Component.eventHub.on(PLAY_EVENT.RATECHANGE,(rate:number)=>{
            this.player.playbackRate = rate;
        })

        Component.eventHub.on(PLAY_EVENT.ISPAUSE,(isPause:boolean)=>{
            if(isPause){
                this.player.pause();
            }else{
                this.player.play();
            }
        })

        Component.eventHub.on(PLAY_EVENT.FORWARD,(value:number)=>{
            this.player.currentTime += value;
        })

    }  
}

export { Video } 