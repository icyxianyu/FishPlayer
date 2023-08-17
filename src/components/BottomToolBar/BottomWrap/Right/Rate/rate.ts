
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import {Menu} from "./Menu";
import {RateChange} from "./RateChange";

export class Rate extends Component {
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'toolButton Rate' });
        new Menu(this.element, video);
        new RateChange(this.element, video)
    }
}
