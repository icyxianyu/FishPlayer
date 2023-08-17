export function getOffSetX(event: MouseEvent | TouchEvent, parentElement: HTMLElement) {
    let pageX;
    if (event instanceof TouchEvent) {
        pageX = event.touches[0].pageX
    } else {
        pageX = event.pageX
    }
    const parentRect = parentElement.getBoundingClientRect();
    const parentX = parentRect.left;
    const offsetX = pageX - parentX;
    return offsetX;
}
