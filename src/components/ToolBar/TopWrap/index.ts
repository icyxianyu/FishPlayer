
import { Player } from "@/page";
import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";
import CurrentButton from "./current";
import ProgressBar from "./ProgressBar";


class TopWrap extends Component {

    constructor(container: HTMLElement, video: Video, Player: Player, options: playerOptions) {
        super(container, 'div', { class: 'topWrap' });
        new ProgressBar(this.element)
        new CurrentButton(this.element, video, Player);
        this.initEvent();
    }
    initEvent(){
        this.element.addEventListener('click', (e) => {
            console.log(e)
        })
    }

}

export default TopWrap;