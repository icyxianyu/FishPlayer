import PLAY_EVENT from "@/constant/event";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import Menu from "./Menu";

class RateChange extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'RateChange' });
        new Menu(this.element)
        this.element.innerHTML = `倍数`;
        this.initEventHub();
    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.RATECHANGE, (rate: number) => {
            if(rate === 1){
                this.element.innerHTML = `倍数`;
            }else{
                this.element.innerHTML = `${rate} x`;
            }
        })
    }

}

export default RateChange;