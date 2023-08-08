import { Modal } from "@/utils";
import Scale from "./scale";

class VideoSetModal extends Modal {
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'videoSetModal' });
        new Scale(this.CurrentElement)
    }
}

export default VideoSetModal;