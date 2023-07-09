import { classProps } from "../types/player";

class Component {
    element: HTMLElement | HTMLVideoElement | HTMLImageElement;

    constructor(container: HTMLElement, type: string, props: classProps = {}) {
        this.element = document.createElement(type);
        if (props.id) 
            this.element.id = props.id;
        if (props.className) 
            this.element.className = props.className;
        container.appendChild(this.element);

    }
}

export default Component;