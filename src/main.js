import chroma from 'chroma-js'
import debounce from 'lodash/debounce'
import clone from 'lodash/clone'

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

// layers
let fills = []
let layersNestingCounter = 0
function getColorsFromSelectedLayers() {
    fills = []
    layersNestingCounter = 0
    const colors = []
    extractorColorsFromLayers(figma.currentPage.selection)
    for (const fill of fills) {
        if (fill.type == 'SOLID') {
            const fillHEX = chroma.gl(...Object.values(fill.color)).hex()
            if (!colors.includes(fillHEX)) {
                colors.push(fillHEX)
            }
        } else {
            if (fill.gradientStops) {
                for (const gradientStops of fill.gradientStops) {
                    let figmaColor = clone(gradientStops.color)
                    delete figmaColor.a
                    const fillHEX = chroma.gl(...Object.values(figmaColor)).hex()
                    if (!colors.includes(fillHEX)) {
                        colors.push(fillHEX)
                    }
                }
            }
        }
    }
    return colors
}
function extractorColorsFromLayers(layers) {
    for (const node of layers) {
        if (node.fills && node.fills.length) {
            fills.push(...node.fills)
        }
        if (node.backgrounds && node.backgrounds.length) {
            fills.push(...node.backgrounds)
        }
        if (node.strokes && node.strokes.length) {
            fills.push(...node.strokes)
        }
        if (node.children && node.children.length) {
            extractorColorsFromLayers(node.children)
            layersNestingCounter++
        }
    }
}

// styles
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
    }, 600)
)
