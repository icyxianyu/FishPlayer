import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { Player } from "@/page";
import { playerOptions } from "@/types/player";

class CurrentButton extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'currentButton' });
        this.initEvent();
    }
    initEvent(){
        
    }

}

export default CurrentButton;