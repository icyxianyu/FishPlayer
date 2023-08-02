import { currentBarIcon } from "@/constant";
import PLAY_EVENT from "@/constant/event";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";

class currentBar extends Component {
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'currentBar' });
        this.init();
    }
    init() {
        this.element.appendChild(createSVG(currentBarIcon))
    }
}

export default currentBar;