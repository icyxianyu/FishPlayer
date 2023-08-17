import { Video } from "@/player/video";
import { Component } from "@/utils/createElement";
import { Modal } from "@/utils/model";
import { Store } from "@/store";
export class VolumeSlider extends Modal {
  constructor(container: HTMLElement, video: Video) {
    super(container, "input", {
      class: "volume-slider",
      type: "range",
      min: "0",
      max: "100",
      step: "1",
    });
    this.initStyle();
    this.initEvent();
    this.initEventHub();
    this.initOptions(video);
  }
  initStyle() {
    this.element.style.top = "-300%";
    this.element.style.transform = "translate(-50%) rotate(270deg)";
    this.element.style.transition = "all 0.5s";
  }
  initEventHub() {
    Store.onSoundChange((value: number) => {
      (this.CurrentElement as HTMLInputElement).value = value.toString();
    });
  }
  initEvent() {
    this.CurrentElement.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      Store.emitSoundChange(parseInt(target.value));
    });
  }

  initOptions(video: Video) {
    const { initVolumne } = video.options;
    if (initVolumne !== undefined) {
      Store.emitSoundChange(initVolumne);
    } else {
      Store.emitSoundChange(100);
    }
  }
}
