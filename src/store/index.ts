import { PLAY_EVENT } from "../constant/event";
import { EventHub } from "../utils/pubsub";

export class Store {
    protected static eventHub: EventHub = new EventHub();

    // 播放时间更新事件
    public static emitTimeUpdate(time: number) {
        this.eventHub.emit(PLAY_EVENT.TIMEUPDATE, time);
    }
    public static onTimeUpdate(fn: Function) {
        this.eventHub.on(PLAY_EVENT.TIMEUPDATE, fn);
    }

    // 声音事件
    public static emitSoundChange(time: number) {
        this.eventHub.emit(PLAY_EVENT.SOUNDCHANGE, time);
    }
    public static onSoundChange(fn: Function) {
        this.eventHub.on(PLAY_EVENT.SOUNDCHANGE, fn);
    }

    // 播放速度改变事件
    public static emitRateChange(rate: number) {
        this.eventHub.emit(PLAY_EVENT.RATECHANGE, rate);
    }
    public static onRateChange(fn: Function) {
        this.eventHub.on(PLAY_EVENT.RATECHANGE, fn);
    }

    // 播放暂停事件
    public static emitIsPause(isPause: boolean) {
        this.eventHub.emit(PLAY_EVENT.ISPAUSE, isPause);
    }
    public static onIsPause(fn: Function) {
        this.eventHub.on(PLAY_EVENT.ISPAUSE, fn);
    }

    // 缓存事件
    public static emitWaiting(isWaiting: boolean) {
        this.eventHub.emit(PLAY_EVENT.WAITING, isWaiting);
    }
    public static onWaiting(fn: Function) {
        this.eventHub.on(PLAY_EVENT.WAITING, fn);
    }

    // 是否可以播放事件
    public static emitCanPlay(isCanPlay: boolean) {
        this.eventHub.emit(PLAY_EVENT.CANPLAY, isCanPlay);
    }
    public static onCanPlay(fn: Function) {
        this.eventHub.on(PLAY_EVENT.CANPLAY, fn);
    }

    // 是否隐藏工具栏
    public static emitIsHide(isHide: boolean) {
        this.eventHub.emit(PLAY_EVENT.ISHIDE, isHide);
    }
    public static onIsHide(fn: Function) {
        this.eventHub.on(PLAY_EVENT.ISHIDE, fn);
    }

    // 工具栏鼠标点击事件
    public static emitMouseClick(persent: number) {
        this.eventHub.emit(PLAY_EVENT.MOUSECLICK, persent);
    }
    public static onMouseClick(fn: Function) {
        this.eventHub.on(PLAY_EVENT.MOUSECLICK, fn);
    }

    // 工具栏是否处于拖拽
    public static emitIsDrag(isDrag: boolean) {
        this.eventHub.emit(PLAY_EVENT.ISDRAG, isDrag);
    }
    public static onIsDrag(fn: Function) {
        this.eventHub.on(PLAY_EVENT.ISDRAG, fn);
    }

    // 工具栏鼠标移动事件
    public static emitMouseMove(persent: number, allWidth?: number) {
        this.eventHub.emit(PLAY_EVENT.MOUSEMOVE, persent, allWidth);
    }
    public static onMouseMove(fn: Function) {
        this.eventHub.on(PLAY_EVENT.MOUSEMOVE, fn);
    }

    // 工具栏鼠标离开事件
    public static emitMouseLeave(isLeave: boolean) {
        this.eventHub.emit(PLAY_EVENT.MOUSELEAVE, isLeave);
    }
    public static onMouseLeave(fn: Function) {
        this.eventHub.on(PLAY_EVENT.MOUSELEAVE, fn);
    }

    // 工具栏鼠标移入事件
    public static emitMouseEnter(isEnter: boolean) {
        this.eventHub.emit(PLAY_EVENT.MOUSEENTER, isEnter);
    }
    public static onMouseEnter(fn: Function) {
        this.eventHub.on(PLAY_EVENT.MOUSEENTER, fn);
    }

    // 快进和快退事件
    public static emitForward(time: number) {
        this.eventHub.emit(PLAY_EVENT.FORWARD, time);
    }
    public static onForward(fn: Function) {
        this.eventHub.on(PLAY_EVENT.FORWARD, fn);
    }

    // 固定声音改变事件
    public static emitFixedSoundChange(volume: number) {
        this.eventHub.emit(PLAY_EVENT.FIXEDSOUNDCHANGE, volume);
    }
    public static onFixedSoundChange(fn: Function) {
        this.eventHub.on(PLAY_EVENT.FIXEDSOUNDCHANGE, fn);
    }

    // 消息发送事件
    public static emitMessage(message: string) {
        this.eventHub.emit(PLAY_EVENT.MESSAGE, message);
    }
    public static onMessage(fn: Function) {
        this.eventHub.on(PLAY_EVENT.MESSAGE, fn);
    }
    // 弹幕显示事件
    public static emitDanmu(isShow: boolean) {
        this.eventHub.emit(PLAY_EVENT.DANMU, isShow);
    }
    public static onDanmu(fn: Function) {
        this.eventHub.on(PLAY_EVENT.DANMU, fn);
    }


    // 弹幕透明度改变事件
    public static emitOpacityChange(opacity: string) {
        this.eventHub.emit(PLAY_EVENT.OPACITY, opacity);
    }
    public static onOpacityChange(fn: Function) {
        this.eventHub.on(PLAY_EVENT.OPACITY, fn);
    }

    // 弹幕显示区域改变事件
    public static emitDanmuAreaChange(area: string) {
        this.eventHub.emit(PLAY_EVENT.DANMUAREA, area);
    }
    public static onDanmuAreaChange(fn: Function) {
        this.eventHub.on(PLAY_EVENT.DANMUAREA, fn);
    }

    // 下面是视频设置的事件

    // 视频比例改变事件
    public static emitScaleChange(scale: string) {
        this.eventHub.emit(PLAY_EVENT.SCALE, scale);
    }
    public static onScaleChange(fn: Function) {
        this.eventHub.on(PLAY_EVENT.SCALE, fn);
    }
    // 视频循环播放事件
    public static emitLoopChange(isLoop: boolean) {
        this.eventHub.emit(PLAY_EVENT.LOOP, isLoop);
    }
    public static onLoopChange(fn: Function) {
        this.eventHub.on(PLAY_EVENT.LOOP, fn);
    }
    // 视频镜像事件
    public static emitMirrorChange(isMirror: boolean) {
        this.eventHub.emit(PLAY_EVENT.MIRROR, isMirror);
    }
    public static onMirrorChange(fn: Function) {
        this.eventHub.on(PLAY_EVENT.MIRROR, fn);
    }

}
