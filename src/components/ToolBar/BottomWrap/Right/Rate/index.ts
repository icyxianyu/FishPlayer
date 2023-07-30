
import { Video } from "@/player/video";
import Component from "@/utils/createElement";
import Menu from "./Menu";
import RateChange from "./RateChange";

class Rate extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'Rate toolButton' });
        new Menu(this.element, video);
        new RateChange(this.element, video)
    }
}

export default Rate;