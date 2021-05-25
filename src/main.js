import chroma from 'chroma-js'
import debounce from 'lodash/debounce'

figma.showUI(__html__)
figma.ui.resize(750, 600)

figma.ui.onmessage = message => {
    if (message === 'getColorsFromSelectedLayers') {
        figma.ui.postMessage({
            name: 'colorsFromSelectedLayers',
            data: getColorsFromSelectedLayers()
        })
    } else {
        figma.ui.postMessage({
            name: 'colorsFromLocalStyles',
            data: getColorsFromLocalStyles()
        })
    }
}
const allowedNodeTyps = [
    'RECTANGLE',
    'STAR',
    'LINE',
    'ELLIPSE',
    'POLYGON',
    'TEXT',
    'GROUP',
    'FRAME'
]
function getColorsFromSelectedLayers() {
    const nodes = []
    const colors = []

    if (
        !figma.currentPage.selection ||
        figma.currentPage.selection.length >= 100
    ) {
        return ['#000000']
    }
    // get nodes
    for (const node of figma.currentPage.selection) {
        if (node.findAll) {
            const newNodes = node.findAll(node => {
                if (allowedNodeTyps.includes(node.type) && node.fills) {
                    return true
                }
            })
            Array.prototype.push.apply(nodes, newNodes)
        } else {
            if (allowedNodeTyps.includes(node.type) && node.fills) {
                nodes.push(node)
            }
        }
        if (nodes.length >= 100) {
            break
        }
    }

    // get colors
    for (const node of nodes) {
        for (const fill of node.fills) {
            if (fill.type == 'SOLID') {
                const fillHEX = chroma.gl(...Object.values(fill.color)).hex()
                if (!colors.includes(fillHEX)) {
                    colors.push(fillHEX)
                }
            }
        }
    }
    return colors
}
function getColorsFromLocalStyles() {
    const colors = []
    const styles = figma.getLocalPaintStyles()

    for (const style of styles) {
        for (const paint of style.paints) {
            if (paint.type == 'SOLID') {
                const paintHEX = chroma.gl(...Object.values(paint.color)).hex()
                if (!colors.includes(paintHEX)) {
                    colors.push(paintHEX)
                }
            }
        }
    }
    return colors
}
figma.on(
    'selectionchange',
    debounce(() => {
        figma.ui.postMessage({
            name: 'colorsFromSelectedLayers',
            data: getColorsFromSelectedLayers()
        })
    }, 1000)
)
