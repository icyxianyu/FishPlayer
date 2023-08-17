// 判断元素是否处于全屏状态
export function isElementFullScreen(element: FullHTMLElement): boolean {
  if (document.fullscreenElement) {
    return document.fullscreenElement === element;
  } else if ((document as any).mozFullScreenElement) {
    return (document as any).mozFullScreenElement === element;
  } else if ((document as any).webkitFullscreenElement) {
    return (document as any).webkitFullscreenElement === element;
  } else if ((document as any).msFullscreenElement) {
    return (document as any).msFullscreenElement === element;
  } else {
    return false;
  }
}

export interface FullHTMLElement extends HTMLElement {
  mozRequestFullScreen: () => Promise<void>;
  webkitRequestFullscreen: () => Promise<void>;
  msRequestFullscreen: () => Promise<void>;
  mozCancelFullScreen: () => Promise<void>;
  webkitExitFullscreen: () => Promise<void>;
  msExitFullscreen: () => Promise<void>;
}
export function enterFull(el: FullHTMLElement): Promise<void> | never {
  if (el.requestFullscreen) {
    return el.requestFullscreen();
  } else if (el.mozRequestFullScreen) {
    return el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    return el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    return el.msRequestFullscreen();
  } else {
    throw new Error("你的浏览器不支持任何全屏请求");
  }
}

export function exitFull(): Promise<void> {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    return (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    return (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    return (document as any).msExitFullscreen();
  } else {
    throw new Error("你的浏览器无法退出全屏");
  }
}
