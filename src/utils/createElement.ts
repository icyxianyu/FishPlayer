import { classProps } from "../types/player";
//发布订阅
class EventHub {
    protected cache: { [key: string]: Array<Function> } = {};

    public on(eventName: string, fn: Function) {
        this.cache[eventName] = this.cache[eventName] || [];
        this.cache[eventName].push(fn);
    }

    public emit(eventName: string, ...arg: any[]) {
        (this.cache[eventName] || []).forEach((fn) => fn(...arg));
    }

    public off(eventName: string, fn: Function) {
        let index = this.cache[eventName]?.indexOf(fn);
        if (index === undefined || index === -1) return;
        this.cache[eventName].splice(index, 1);
    }
}

class Component {
    element: HTMLElement | HTMLVideoElement | HTMLImageElement;
    protected static eventHub: EventHub = new EventHub();

    constructor(container: HTMLElement, type: string, props: classProps = {}) {
        this.element = document.createElement(type);
        for (const [key, value] of Object.entries(props)) {
            this.element.setAttribute(key, value);
        }
        container.appendChild(this.element);
    }
}

export default Component;