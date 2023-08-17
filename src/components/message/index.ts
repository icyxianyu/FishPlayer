import { Player } from "@/page";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { Component } from "@/utils";

export class Message extends Component {
    maxNumber: number = 3;
    messageNumber: number = 0;
    timer!: NodeJS.Timeout;
    constructor(container: HTMLElement, video: Video, play: Player) {
        super(container, 'div', { class: 'message-info' });
        this.initEventHub();
    }

    initEventHub() {
        Store.onMessage((message: string) => {
            clearTimeout(this.timer);
            this.element.innerHTML = '';
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            messageItem.innerText = message;
            this.element.appendChild(messageItem);
            this.timer = setTimeout(() => {
                this.element.removeChild(messageItem);
            }, 2000);

        })
    }
}
