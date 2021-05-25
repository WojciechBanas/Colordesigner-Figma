export default {
    data() {
        return {
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
            activeMainTab: 'color-list',
            mainTabs: [
                {
                    label: 'Tints/Shades',
                    name: 'tints-shades'
                },
                {
                    label: 'Gradient Generator',
                    name: 'gradient-generator'
                },
                {
                    label: 'Color Picker',
                    name: 'color-picker'
                },
                {
                    label: 'Images ★',
                    name: 'images'
                }
            ],
            activeShadesTab: 'tints',
            shadesTabs: [
                {
                    label: 'Tints',
                    name: 'tints'
                },
                {
                    label: 'Shades',
                    name: 'shades'
                },
                {
                    label: 'Color Harmonies',
                    name: 'color-harmonies'
                }
            ],
            activeShadesTab: 'tints',
            shadesTabs: [
                {
                    label: 'Tints',
                    name: 'tints'
                },
                {
                    label: 'Shades',
                    name: 'shades'
                },
                {
                    label: 'Color Harmonies',
                    name: 'color-harmonies'
                }
            ],
            activeColorHarmoniesTab: 'complementary',
            colorHarmoniesTabs: [
                {
                    label: 'Complementary',
                    name: 'complementary'
                },
                {
                    label: 'Analogous',
                    name: 'analogous'
                },
                {
                    label: 'Split Complementary',
                    name: 'split-complementary'
                },
                {
                    label: 'Triad',
                    name: 'triad'
                },
                {
                    label: 'Square',
                    name: 'square'
                },
                {
                    label: 'Rectangle',
                    name: 'rectangle'
                }
            ],
            activeColorsTab: 'green',
            colorsTabs: [
                {
                    label: 'Green',
                    name: 'green'
                },
                {
                    label: 'Blue',
                    name: 'blue'
                },
                {
                    label: 'Red',
                    name: 'red'
                },
                {
                    label: 'Orange',
                    name: 'orange'
                },
                {
                    label: 'Purple',
                    name: 'purple'
                },
                {
                    label: 'Yellow',
                    name: 'yellow'
                },
                {
                    label: 'Gray',
                    name: 'grey'
                }
            ]
        }
    },
    methods: {
        handleMainTabChange(name){
            this.activeMainTab = name
        },
        handleShadeTabChange(name){
            this.activeShadesTab = name
    },
        handleColorHarmoniesTabChange(name){
            this.activeColorHarmoniesTab = name
        },
        handleNewColorTabChange(name){
            this.activeColorsTab = name
        },
        handleColorSourceTabChange(name){
            if(this.$options._componentTag  != 'GradientGenerator'){
                this.changeActiveColor(0)
            }
            if(name === 'local-styles'){
                parent.postMessage({ pluginMessage: 'getColorsFromLibrary' }, '*')
            }else{
                parent.postMessage({ pluginMessage: 'getColorsFromSelectedLayers' }, '*')
            }
            this.activeColorSourceTab = name
        }
    },
}
