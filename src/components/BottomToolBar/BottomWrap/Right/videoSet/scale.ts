import { Store } from "@/store";
import { Component } from "@/utils";

class Scale extends Component {
    select!: HTMLElement;
    selectArr: Array<HTMLElement> = [];
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'scale' });
        this.init()
    }
    init() {
        let name = new Component(this.element, 'div', { class: 'scale__name' }).element
        name.innerHTML = '视频比例'
        this.element.appendChild(name);
        this.select = new Component(this.element, 'div', { class: 'scale__select' }).element
        this.element.appendChild(this.select);
        this.appendchoselist()
    }
    appendchoselist() {
        let list = ['自动', '16:9', '4:3'];
        list.forEach((item, index) => {
            let div = new Component(this.select, 'div', { class: 'scale__select__item' }).element
            div.innerHTML = item;
            if (index == 0) { div.classList.add('active') }
            div.onclick = (event) => this.changeValue(event, index)
            this.select.appendChild(div);
            this.selectArr.push(div)
        })
    }

    changeValue(event: Event, index: number) {
        this.selectArr.forEach((item, i) => {
            if (i == index) {
                item.classList.add('active')
                Store.emitScaleChange(item.innerHTML)
            } else {
                item.classList.remove('active')
            }

        });
    }
}
export default Scale;