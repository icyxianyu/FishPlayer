import { Store } from "@/store";
import { Component } from "@/utils";

class Mirror extends Component {
  checkbox!: HTMLInputElement;
  constructor(container: HTMLElement) {
    super(container, "div", { class: "mirror set" });
    this.init();
  }
  init() {
    let text = new Component(this.element, "label", {
      class: "set__text",
      for: "mirror",
    }).element;
    text.innerHTML = "镜像画面";
    this.element.appendChild(text);
    this.checkbox = new Component(this.element, "input", {
      class: "set__checkbox",
      type: "checkbox",
      id: "mirror",
    }).element as HTMLInputElement;
    this.element.appendChild(this.checkbox);
    this.checkbox.onchange = this.changeValue;
  }

  changeValue(Event: Event) {
    Store.emitMirrorChange((Event.target as HTMLInputElement).checked);
  }
}

export default Mirror;
