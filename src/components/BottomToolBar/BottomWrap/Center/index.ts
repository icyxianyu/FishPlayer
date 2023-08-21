import { Danmaku } from "@/components/danmaku/danmakuIcon";
import { DanmakuSet } from "@/components/danmaku/danmakuSet/danmakuSet";
import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";

export class CenterContainer extends Component {
  constructor(container: HTMLElement, video: Video, Player: Player) {
    super(container, "div", { class: "toolbox-container center" });
    const { danmaku, components } = video.options ?? {};
    const { center } = components ?? {};
    if (danmaku) {
      new Danmaku(this.element);
      new DanmakuSet(this.element, video);
    }
    if (center) {
      center.forEach((component) => {
        new component(this.element, video, Player);
      });
    }
  }
}
