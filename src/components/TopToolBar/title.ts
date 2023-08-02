
import { Store } from "@/store";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { toolbarHeight } from "@/constant/px";

class Title extends Component {

    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, 'span', { class: 'title' });
        const { title } = Player.options;
        if (title)
            this.element.innerHTML = title;
    }

}

export default Title;