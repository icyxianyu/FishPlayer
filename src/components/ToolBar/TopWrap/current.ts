import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import { Player } from "@/page";
import { playerOptions } from "@/types/player";

class CurrentButton extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'div', { class: 'progress-bar' ,type:"range",min:"0",max:"100"});
        
    }
}

export default CurrentButton;