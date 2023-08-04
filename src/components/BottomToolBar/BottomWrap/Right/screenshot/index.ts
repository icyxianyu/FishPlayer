import { screenshot } from "@/constant";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { createImage } from "@/utils/screenshot";

class ScreenShot extends Component {
    video: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'toolButton screenShot icon' });
        this.video = video.element as HTMLVideoElement;

        this.element.appendChild(createSVG(screenshot, '-2 -2 24 24'));
        this.initEvent();
    }
    initEvent() {
        this.element.onclick = () => {
            createImage(this.video);
        }
    }
}
export default ScreenShot;