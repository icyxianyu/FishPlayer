import { classProps } from "../types/player";

export class Component {
    element: HTMLElement | HTMLVideoElement | HTMLImageElement;
    constructor(container: HTMLElement, type: string, props: classProps = {}) {
        this.element = document.createElement(type);
        for (const [key, value] of Object.entries(props)) {
            this.element.setAttribute(key, value);
        }
        container.appendChild(this.element);
    }
}