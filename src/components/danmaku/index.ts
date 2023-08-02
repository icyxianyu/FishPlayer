import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";

class danmaku extends Component {
    trackNum: number;
    danmakuPool: any[];
    player: Player;
    constructor(container: HTMLElement, video: Video, player: Player) {
        super(container, "div", { class: "danmaku" });
        //轨道数量 
        this.danmakuPool = [];
        this.trackNum = 20;
        this.player = player;
        this.init();
        this.initEvent();
    }

    init() {
        // 创建轨道
        setInterval(() => {
            let arr = [];

            for (let i = 0; i < Math.random() * 10; i++) {
                arr.push({
                    text: i + "测试弹幕,测试弹幕",
                    color: "#fff",
                    line: Math.floor(Math.random() * this.trackNum)
                });
            }
            this.appendElement(arr);

        }, 300)

    }
    appendElement(arr: any[]) {
        arr.forEach((item: any) => {
            const { text, color, line } = item;
            const { height } = this.player.element.getBoundingClientRect();

            const ele = document.createElement("div");
            ele.className = "danmaku-item";
            ele.innerHTML = text;
            ele.style.color = color;
            ele.style.top = `${line * height / this.trackNum}px`;
            ele.style.left = "100%";
            this.element.appendChild(ele);
            this.danmakuPool.push(ele);
            
        });
    }

    initEvent() {
        setInterval(() => {
            this.danmakuPool.forEach((item: HTMLElement) => {
                item.style.left = parseInt(item.style.left.replace("%", "")) - 1 + "%";
            });
        }, 50)
    }


}
export default danmaku;