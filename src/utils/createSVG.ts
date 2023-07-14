const svgNS = 'http://www.w3.org/2000/svg';

/*
    * @description: 创建一个svg元素
    * @param {string} d: path的d属性
    * @param {string} viewBox: svg的viewBox属性
    * @return {SVGSVGElement} svg元素
*/
export const createSVG = (d: string, viewBox = '0 0 24 24'): SVGSVGElement => {
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute("stroke", "white")
    svg.setAttribute("fill", "white")
    svg.setAttribute('viewBox', viewBox)
    if (d) {
        const path = document.createElementNS(svgNS, 'path')
        path.setAttribute('d', d)
        svg.appendChild(path)
    }
    return svg
}