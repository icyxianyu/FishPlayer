import { Video } from "@/player/video";
import { Modal } from "@/utils";
import { OpacitySet } from "./opacitySet";
import { ShowPlace } from "./showPlace";

export class DanmakuSetContainer extends Modal {
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'danmakuSetContainer' });
        new OpacitySet(this.CurrentElement, video);
        new ShowPlace(this.CurrentElement, video)
    }
}
