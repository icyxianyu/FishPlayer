// 继承自fetch接口第二个参数
export interface danmakuOptions extends RequestInit {
    url?: string;
    interval?: number;
    data: Record<string, any>;
}


export type Control = {
    pause?: boolean;
    time?: boolean;
    volumne?: boolean;
    rate?: boolean;
    fullScreen?: boolean;
    progress?: boolean;
    screenShot?: boolean;
}

export type components = {
    left?: any[];
    right?: any[];
    center?: any[];
    top?: any[];
}

export type playerOptions = {
    title?: string;
    url: string;
    stream?: boolean;
    el: HTMLElement;
    width?: number;
    height?: number;
    initVolumne?: number;
    theme?: string;
    rate?: number[];
    initRate?: number;
    isShowControl?: boolean;
    control?: Control;
    components?: components;
    danmaku?: danmakuOptions;
}

export type classProps = {
    [key: string]: string;
};