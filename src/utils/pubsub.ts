export class EventHub {
  protected cache: { [key: string]: Array<Function> } = {};

  public on(eventName: string, fn: Function) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }

  public emit(eventName: string, ...arg: any[]) {
    (this.cache[eventName] || []).forEach((fn) => fn(...arg));
  }

  public off(eventName: string, fn: Function) {
    let index = this.cache[eventName]?.indexOf(fn);
    if (index === undefined || index === -1) return;
    this.cache[eventName].splice(index, 1);
  }
}
