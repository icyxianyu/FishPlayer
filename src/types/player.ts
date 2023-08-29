import { Player } from "@/page";
import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";

interface initOptions {
  opacity?: number;
  area?: number;
}

// 组件的构造函数
export interface ComponentConstructor {
  new (container: HTMLElement, video: Video, player: Player): Component;
}

// 继承自fetch接口第二个参数
export interface danmakuOptions extends RequestInit {
  url?: string;
  interval?: number;
  isCanvas?: boolean;
  data: Record<string, any>;
  initOptions?: initOptions;
}

export type Control = {
  pause?: boolean;
  time?: boolean;
  volumne?: boolean;
  rate?: boolean;
  fullScreen?: boolean;
  progress?: boolean;
  screenShot?: boolean;
  danmu?: boolean;
  setting?: boolean;
  smallWindow?: boolean;
  webFullScreen?: boolean;
};

export type components = {
  left?: ComponentConstructor[];
  right?: ComponentConstructor[];
  center?: ComponentConstructor[];
  top?: ComponentConstructor[];
};

export type playerOptions = {
  title?: string;
  url: string;
  stream?: boolean;
  el: HTMLElement;
  width?: string;
  height?: string;
  initVolumne?: number;
  theme?: string;
  rate?: number[];
  initRate?: number;
  isShowControl?: boolean;
  control?: Control;
  components?: components;
  danmaku?: danmakuOptions;
  plugin?: Plugin[];
};
export type Plugin = (player: Player) => {};

export type classProps = {
  [key: string]: string;
};
