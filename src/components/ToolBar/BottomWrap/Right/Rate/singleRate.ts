import PLAY_EVENT from "@/constant/event";
import Component from "@/utils/createElement";

class SingleRate extends Component{
    constructor(container:HTMLElement,speed:number){
        super(container,'div',{class:'singleRate'});
        this.element.innerHTML = `${speed}x`;
        this.initEvent(speed);
        this.initEventHub(speed);
    }
    initEvent(speed:number){
        this.element.onclick = ()=>{
            Component.eventHub.emit(PLAY_EVENT.RATECHANGE,speed);
        }
    }
    initEventHub(speed:number){
        if(speed === 1){
            this.element.classList.add('active');
        }

        Component.eventHub.on(PLAY_EVENT.RATECHANGE,(rate:number)=>{
            if(rate === speed){
                this.element.classList.add('active');
            }else{
                this.element.classList.remove('active');
            }
        })
    }
    
}
export default SingleRate;