export type Control = {
    pause?:boolean;
    time?:boolean;
    sound?:boolean;
    rate?:boolean;
    fullScreen?:boolean;

}

export type playerOptions = {
    url: string;
    el: HTMLElement;
    width?: number;
    height?: number;
    initVolumne?: number;
    initRate?: number;
    theme?: string;
    //倍数
    rate?: number[];
    isShowControl?: boolean;
    control?: Control;


}

export type classProps = {
    [key: string]: string;
};