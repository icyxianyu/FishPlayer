import { screenshot } from "@/constant";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { Component } from "@/utils/createElement";
import { createSVG } from "@/utils/createSVG";
import { createImage } from "@/utils/screenshot";

class ScreenShot extends Component {
    video: HTMLVideoElement;
    constructor(container: HTMLElement, video: Video) {
        super(container, 'div', { class: 'toolButton screenShot icon' });
        this.video = video.element as HTMLVideoElement;
        this.createText('截图');
        this.element.appendChild(createSVG(screenshot, '-2 -2 24 24'));
        this.initEvent();
    }
    initEvent() {
        this.element.onclick = () => {
            const canvas = document.createElement('canvas');
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            canvas
                .getContext("2d")!
                .drawImage(this.video, 0, 0, canvas.width, canvas.height)
            try {
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob || new Blob());
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "screenshot.png";
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    Store.emitMessage("截图成功");
                }, "image/png");
            } catch (e) {
                console.log(e);
                Store.emitMessage("截图失败");
            }
        }
    }
}
export default ScreenShot;