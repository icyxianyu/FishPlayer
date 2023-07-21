import PLAY_EVENT from "@/constant/event";
import Component from "@/utils/createElement";

class HoverContainer extends Component {
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'hover-container' });
        this.initEventHub();
    }
    initEventHub() {
        Component.eventHub.on(PLAY_EVENT.MOUSEMOVE, (x:string) => {
            
        })
    }
}

export default HoverContainer;