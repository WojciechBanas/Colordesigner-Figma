const chroma = require('chroma-js')
const Spectra = require('spectra')
exports.getTints = function(color = '#444', steps = 10, mode = 'hsl') {
    const tints = []
    for (let i = 1; i <= steps; i++) {
        const tint = chroma.mix(color, '#fff', i / steps, mode).hex()
        tints.push(tint)
    }

    return tints
}

exports.getShades = function(color = '#444', steps = 10, mode = 'hsl') {
    const shades = []
    for (let i = 1; i <= steps; i++) {
        const shade = chroma.mix(color, '#000', i / steps, mode).hex()
        shades.push(shade)
    }
    return shades
}

exports.getContras = function(color1, color2) {
    return chroma.contrast(color1, color2)
}

exports.convertColorTo = function(color, format) {
    switch (format) {
        case 'rgb':
            return chroma(color).css('rgb')
        case 'hsl':
            return chroma(color).css('hsl')
    }
}

exports.parseColors = function(colors) {
    const parsedColors = []
    for (const color of colors) {
        const isHexOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
        if (isHexOk) {
            parsedColors.push(color)
        } else {
            parsedColors.push('#000000')
        }
    }
    return parsedColors
}

exports.getColorHarmonies = function(color) {
    const spectraObject = new Spectra(color)
    const analogous = spectraObject
        .harmony('analogous')
        .map(color => color.hex())
    const triad = spectraObject.harmony('triad').map(color => color.hex())
    const complementary = spectraObject
        .harmony('complementary')
        .map(color => color.hex())
    const splitComplementary = spectraObject
        .harmony('split-complementary')
        .map(color => color.hex())
    const square = spectraObject.harmony('square').map(color => color.hex())
    const rectangle = spectraObject
        .harmony('rectangle')
        .map(color => color.hex())
    return {
        analogous,
        triad,
        complementary,
        splitComplementary,
        square,
        rectangle
    }
}
