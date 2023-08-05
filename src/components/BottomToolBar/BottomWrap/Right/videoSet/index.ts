import { videoSet } from "@/constant";
import { Video } from "@/player/video";
import { createSVG } from "@/utils";
import { Component } from "@/utils/createElement";

class VideoSet extends Component {
    video: Video;
    constructor(container: HTMLElement, video: Video) {
        super(container, "div", { class: "videoSet toolButton icon" });
        this.video = video;
        this.initVideo();
        this.initEvent();
    }

    initVideo() {
        const svg = createSVG(videoSet, '-5 -5 30 30')
        this.element.appendChild(svg);
        this.createText("视频设置");

    }

    initEvent() {

    }
}

export default VideoSet;