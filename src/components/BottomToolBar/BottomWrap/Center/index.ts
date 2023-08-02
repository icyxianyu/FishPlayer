
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";


class CenterContainer extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolbox-container center" });
        const { center } = video.options?.components ?? {};
        if (center){
            center.forEach((component) => {
                new component(this.element, video, Player);
            })
        }
    }
}

export default CenterContainer;