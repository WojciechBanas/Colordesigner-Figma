import Vuex from 'vuex'
import {convertColorTo}  from './utils/color-utils.js'

const createStore = () => {
    return new Vuex.Store({
        state: {
            colors: [
                {
                    value: '#000000',
                    title: 'black'
                }
            ],
            activeColorIndex: 0,
            presentationMode: false,
            stockPromo: false,
            activeColorSourceTab: 'selected-layers',
            colorSourceTabs: [
                {
                    label: 'Selected Layers',
                    name: 'selected-layers'
                },
                {
                    label: 'Local Styles',
                    name: 'local-styles'
                }
            ],
            cachedImages: {}
        },
        getters: {
            activeColor(state) {
                const rgbValue = convertColorTo(
                    state.colors[state.activeColorIndex].value,
                    'rgb'
                )
                const hslValue = convertColorTo(
                    state.colors[state.activeColorIndex].value,
                    'hsl'
                )
                return {
                    hex: state.colors[state.activeColorIndex].value,
                    rgb: rgbValue,
                    hsl: hslValue
                }
            }
        },
        mutations: {
            setColor(state, color) {
                Vue.set(state.colors, state.activeColorIndex, color)
            },
            setColors(state, colors) {
                state.colors = colors
            },
            changeActiveColor(state, index) {
                state.activeColorIndex = index
            },
            cacheImages(state, {phrase, images}){
                state.cachedImages[phrase] = images
            },
            removeCachedImages(state){
                state.cachedImages = {}
            },
            setColorSourceTab(state, name) {
                state.activeColorSourceTab = name

                if(name === 'local-styles'){
                    parent.postMessage({ pluginMessage: 'getColorsFromLibrary' }, '*')
                }else{
                    parent.postMessage({ pluginMessage: 'getColorsFromSelectedLayers' }, '*')
                }
            }
        }
    })
}

export default createStore
