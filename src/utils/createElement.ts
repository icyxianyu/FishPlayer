import { classProps } from "../types/player";

export class Component {
  element: HTMLElement | HTMLVideoElement | HTMLImageElement;
  textElement!: HTMLDivElement;
  constructor(container: HTMLElement, type: string, props: classProps = {}) {
    this.element = document.createElement(type);
    for (const [key, value] of Object.entries(props)) {
      this.element.setAttribute(key, value);
    }
    container.appendChild(this.element);
  }

  createText(text: string) {
    const { x, y, width, height } = this.element.getBoundingClientRect();
    this.textElement = document.createElement("div");
    this.textElement.setAttribute("class", "text-model");
    this.textElement.innerText = text;
    this.textElement.style.top = `-${height}px`;
    this.element.appendChild(this.textElement);
    this.element.onmouseenter = () => {
      this.textElement.style.opacity = "1";
    };
    this.element.onmouseleave = () => {
      this.textElement.style.opacity = "0";
    };
    this.element.onclick = () => {
      this.textElement.style.opacity = "0";
    };
  }
  changeText(text: string) {
    this.textElement.innerText = text;
  }
}
