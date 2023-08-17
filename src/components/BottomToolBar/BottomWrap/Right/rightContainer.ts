
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { FullScreen } from "./fullscreen";
import { Rate } from "./Rate/rate";
import { ScreenShot } from "./screenshot";
import { SmallWindow } from "./smallWindow";
import { VideoSet } from "./videoSet/videoSet";
import { Volume } from "./volume/volume";
import { WebFullScreen } from "./webFullScreen";

export class RightContainer extends Component {
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div", { class: "toolbox-container right" });
        const { rate = true,
            volumne = true,
            fullScreen = true,
            screenShot = true,
            webFullScreen = true,
            smallWindow = true,
            setting = true }
            = video.options?.control ?? {};
        const { right } = video.options?.components ?? {};
        if (right) {
            right.forEach((component) => {
                new component(this.element, video, Player);
            })
        }

        if (volumne)
            new Volume(this.element, video, Player);
        if (rate)
            new Rate(this.element, video);
        if (setting)
            new VideoSet(this.element, video);
        if (screenShot)
            new ScreenShot(this.element, video)
        if (smallWindow && !video.Env)
            new SmallWindow(this.element, video, Player)
        if (webFullScreen && !video.Env)
            new WebFullScreen(this.element, video, Player)
        if (fullScreen)
            new FullScreen(this.element, video, Player);
    }
}
