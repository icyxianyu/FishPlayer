import Modal from "@/utils/model";
import SingleRate from "./singleRate";

class Menu extends Modal {
    constructor(container: HTMLElement) {
        super(container, "div", { class: "menu" });
        this.initSpeed();
    }
    initSpeed() {
        const speed = [2, 1.5, 1, 0.5]
        speed.forEach((item) => {
            new SingleRate(this.CurrentElement, item);
        })
    }
    

}
export default Menu;