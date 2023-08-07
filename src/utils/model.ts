import { Component } from "./createElement";
import { classProps } from "../types/player";

export class Modal extends Component {
    container: HTMLElement;
    timer!: NodeJS.Timeout;
    time: number;
    CurrentElement: HTMLElement;

    constructor(container: HTMLElement, type: string, props: classProps = {}) {
        super(container, 'div', { class: 'modal' })
        this.CurrentElement = new Component(this.element, type, props).element;
        this.time = 200;
        this.container = container;
        this.initModalEvent();
    }

    initModalEvent() {
        this.container.onmouseenter = () => {
            clearTimeout(this.timer);
            this.element.style.display = 'block';
        }

        this.container.onmouseleave = () => {
            this.timer = setTimeout(() => {
                this.element.style.display = 'none';
            }, this.time)

        }

        this.element.onmouseenter = () => {
            clearTimeout(this.timer);
        }

        this.element.onmouseleave = () => {
            this.timer = setTimeout(() => {
                this.element.style.display = 'none';
            }, this.time)
        }
    }
}