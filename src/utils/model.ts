import { Component } from "./createElement";
import { classProps } from "../types/player";
import { Env } from "./Env";

export class Modal extends Component {
    container: HTMLElement;
    timer!: NodeJS.Timeout;
    time: number;
    CurrentElement: HTMLElement;
    Env: boolean;

    constructor(container: HTMLElement, type: string, props: classProps = {}) {
        super(container, 'div', { class: 'modal' })
        this.CurrentElement = new Component(this.element, type, props).element;
        this.Env = Env();

        this.time = this.Env ? 2000 : 200;
        this.container = container;
        this.initModalEvent();
    }

    initModalEvent() {
        if (this.Env) {
            this.container.addEventListener('touchstart', () => {
                clearTimeout(this.timer);
                this.element.style.display = 'block';
            })

            this.container.addEventListener('touchend', () => {
                this.timer = setTimeout(() => {
                    this.element.style.display = 'none';
                }, this.time)
            })

            this.element.addEventListener('touchmove', () => {
                clearTimeout(this.timer);
            })

        } else {
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
}