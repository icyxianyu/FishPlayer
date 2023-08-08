import { Modal } from "@/utils";
import Rollback from "./rollback";
import Scale from "./scale";

class VideoSetModal extends Modal {
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'videoSetModal' });
        new Scale(this.CurrentElement);
        new Rollback(this.CurrentElement);
    }
}

export default VideoSetModal;