import { Store } from "@/store";
import { Component } from "@/utils";

class Rollback extends Component {
    checkbox!: HTMLInputElement;
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'rollback' })
        this.init();
    }
    init() {
        let text = new Component(this.element, 'div', { class: 'rollback__text' }).element;
        text.innerHTML = '洗脑循环'
        this.element.appendChild(text);
        this.checkbox = new Component(this.element,
            'input',
            {
                class: 'rollback__checkbox',
                type: 'checkbox'
            }).element as HTMLInputElement;
        this.element.appendChild(this.checkbox);
        this.checkbox.onchange = this.changeValue;
    }

    changeValue(Event: Event) {
        Store.emitLoopChange((Event.target as HTMLInputElement).checked);
    }
}

export default Rollback;