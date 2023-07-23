import Component from "./createElement";

class Modal extends Component {
    container: HTMLElement;
    timer!: NodeJS.Timeout;
    time: number;

    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'modal' })
        this.time = 200;
        this.container = container;
        this.initStyle();
        this.initEvent();
    }

    initStyle() {
        // 在this.container位置的正上方出现

        this.element.style.transform = 'translate(0,-110%)';
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.backgroundColor = 'rgba(0,0,0,0.8)';
        this.element.style.display = 'none';
    }

    initEvent() {
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
export default Modal;