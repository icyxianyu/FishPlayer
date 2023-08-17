import { Player } from "@/page";
import { Video } from "@/player/video";
import { Store } from "@/store";
import { Component } from "@/utils";
import Hammer from "hammerjs";
import { MobileVolume } from "./mobileVolume";
export class Mobile extends Component {
    hammer: HammerManager;
    startX: number;
    startY: number;
    axis: "horizontal" | "vertical" | null;
    constructor(container: HTMLElement, video: Video, Player: Player) {
        super(container, "div");
        new MobileVolume(this.element, video, Player);
        this.hammer = new Hammer(Player.element);
        this.hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
        this.startX = 0;
        this.startY = 0;
        this.axis = null;
        this.initEvent();
    }
    initEvent() {
        this.hammer.on("panstart", (event) => {
            this.startX = event.center.x;
            this.startY = event.center.y;
            this.axis = null; // Reset active axis
        });

        this.hammer.on("panmove", (event) => {
            if (!this.axis) {
                const deltaX = Math.abs(event.center.x - this.startX);
                const deltaY = Math.abs(event.center.y - this.startY);

                if (deltaX > deltaY) {
                    this.axis = "horizontal";
                } else {
                    this.axis = "vertical";
                }
            }

            if (this.axis === "horizontal") {
                if (event.deltaX > 0) {
                    Store.emitForward(1);
                } else {
                    Store.emitForward(-1);
                }
            } else if (this.axis === "vertical") {
                if (event.deltaY > 0) {
                    Store.emitFixedSoundChange(-1);
                } else {
                    Store.emitFixedSoundChange(1);
                }
            }

            this.startX = event.center.x;
            this.startY = event.center.y;
        });
    }
}