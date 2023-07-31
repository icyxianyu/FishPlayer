export type Control = {
    pause?: boolean;
    time?: boolean;
    volumne?: boolean;
    rate?: boolean;
    fullScreen?: boolean;
    progress?: boolean;
    screenShot?: boolean;
}

export type playerOptions = {
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

}

export type classProps = {
    [key: string]: string;
};