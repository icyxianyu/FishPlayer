import { Component, Modal } from "@/utils";
import Mirror from "./mirrorChange";
import Rollback from "./rollback";
import Scale from "./scale";

class VideoSetModal extends Modal {
  constructor(container: HTMLElement) {
    super(container, "div", { class: "videoSetModal" });
    new Scale(this.CurrentElement);
    const row = new Component(this.CurrentElement, "div", { class: "row" })
      .element;
    new Rollback(row);
    new Mirror(row);
  }
}

export default VideoSetModal;
