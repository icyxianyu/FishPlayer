function getOffSetX(event:MouseEvent,parentElement:HTMLElement){
    const pageX = event.pageX;
    const parentRect = parentElement.getBoundingClientRect();
    const parentX = parentRect.left;
    const offsetX = pageX - parentX;
    return offsetX;
}

export default getOffSetX;