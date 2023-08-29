import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { CanvasMethod } from "./danmakuMethod/canvasMethod";
import { DomMethod } from "./danmakuMethod/domMethod";

export class danmaku extends Component {
  constructor(container: HTMLElement, video: Video, player: Player) {
    super(container, "div", { class: "danmaku" });
    const { danmaku } = video.options;
    if (!danmaku) return;
    const { isCanvas } = danmaku;

    if (isCanvas) new CanvasMethod(this.element, video, player);
    else new DomMethod(this.element, video, player);
  }
}
