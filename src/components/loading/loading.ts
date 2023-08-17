import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
export class Loading extends Component {
  constructor(container: HTMLElement, video: Video) {
    super(container, "div", { class: "loadingSeven" });
    this.appenChild();
  }

  appenChild() {
    for (let i = 0; i < 5; i++) {
      const span = new Component(this.element, "span", {
        class: "loadingSeven-item",
      });
      this.element.appendChild(span.element);
    }
  }
}
