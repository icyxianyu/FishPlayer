import { Store } from "@/store";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import currentBar from "./currentbar";
import time from "./time";

export class HoverContainer extends Component {
  constructor(container: HTMLElement, video: Video) {
    super(container, "div", { class: "hover-container" });
    new currentBar(this.element).element as HTMLElement;
    new time(this.element, video);
    this.initEventHub();
  }
  initEventHub() {
    Store.onMouseMove((x: string) => {
      this.element.style.display = "block";
      this.element.style.left = x + "px";
    });
    Store.onMouseLeave((isLeave: boolean) => {
      if (isLeave) {
        this.element.style.display = "none";
      }
    });
  }
}
