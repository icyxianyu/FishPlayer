
import { Player } from "@/page";
import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import Component from "@/utils/createElement";
import ProgressBar from "./ProgressBar";


class TopWrap extends Component {

    constructor(container: HTMLElement, video: Video, Player: Player, options: playerOptions) {
        super(container, 'div', { class: 'topWrap' });
        new ProgressBar(this.element, video, Player, options)

    }

}

export default TopWrap;