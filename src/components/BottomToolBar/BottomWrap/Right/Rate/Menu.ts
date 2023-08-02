import { Video } from "@/player/video";
import { playerOptions } from "@/types/player";
import { Modal } from "@/utils/model";
import SingleRate from "./singleRate";

class Menu extends Modal {
    rate: number[] | undefined;

    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "menu" });
        this.rate = video.options.rate;
        this.initSpeed();
    }
    initSpeed() {
        const speed = this.rate ? this.rate : [2, 1.5, 1, 0.5];
        speed.forEach((item) => {
            new SingleRate(this.CurrentElement, item);
        })
    }


}
export default Menu;