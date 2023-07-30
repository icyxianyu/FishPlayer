import Store from "@/store";
import { Video } from "@/player/video";
import Component from "@/utils/createElement";

class RateChange extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'RateChange' });
        this.element.innerHTML = `倍数`;
        this.initEventHub();
    }
    initEventHub() {
        Store.onRateChange((rate: number) => {
            if(rate === 1){
                this.element.innerHTML = `倍数`;
            }else{
                this.element.innerHTML = `${rate} x`;
            }
        })
    }

}

export default RateChange;