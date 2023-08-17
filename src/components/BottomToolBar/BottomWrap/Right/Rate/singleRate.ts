import { Store } from "@/store";
import { Component } from "@/utils/createElement";

export class SingleRate extends Component {
    constructor(container: HTMLElement, speed: number) {
        super(container, 'div', { class: 'singleRate' });
        this.element.innerHTML = `${speed}x`;
        this.initEvent(speed);
        this.initEventHub(speed);
    }
    initEvent(speed: number) {
        this.element.onclick = () => {
            Store.emitRateChange(speed);
        }
    }
    initEventHub(speed: number) {
        if (speed === 1) {
            this.element.classList.add('active');
        }
        Store.onRateChange((rate: number) => {
            if (rate === speed) {
                this.element.classList.add('active');
            } else {
                this.element.classList.remove('active');
            }
        })
    }

}