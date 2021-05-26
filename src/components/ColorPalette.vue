<template>
    <div class="color-palette">
        <div
            class="color-palette__active-color"
            :style="'background:' + colors[activeColorIndex].value"
        />
        <TabsNav
            class="color-palette__tabs"
            size="sm"
            :tabsList="colorSourceTabs"
            @tabChange="handleColorSourceTabChange"
            :activeTab="activeColorSourceTab"
        ></TabsNav>
        <div class="color-palette__color-list">
            <div
                v-for="(color, index) of colors"
                :key="index"
                class="color-palette__color"
                :style="'background:' + color.value"
                @click="changeActiveColor(index)"
                :title="color.name"
            />
        </div>
        <div class="color-palette__actions">
            <button class="btn btn--sm btn--block" @click="showPaletteOnline">
                View Palette Online
            </button>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import tabsMixin from './../tabs.js'
import chroma from 'chroma-js'
import TabsNav from './tabs/TabsNav.vue'

export default {
    components: {
        TabsNav,
    },
    computed: {
        ...mapState([
            'colors',
            'activeColorIndex',
            'activeColor',
            'stockPromo',
            'globalActiveColorSource'
        ]),
        ...mapGetters(['activeColor']),
    },
    data() {
        return {
            dialogVisible: false,
            notData: '',
        }
    },
    mounted() {
        this.handleMessage()
    },
    methods: {
        showPaletteOnline() {
            let colors = this.colors.map((color) => {
                return chroma(color.value).hex().substring(1)
            })
            colors = colors.join('-')
            window.open(
                `https://colordesigner.io/?presentationMode=true&from=figma#${colors}`,
                '_blank'
            )
        },
        handleMessage() {
            onmessage = (event) => {
                if (
                    event.data.pluginMessage.name ==
                        'colorsFromSelectedLayers' &&
                    this.globalActiveColorSource == 'local-styles'
                ) {
                    return
                }
                this.changeActiveColor(0)
                let colors = []
                if (
                    event.data.pluginMessage.data &&
                    event.data.pluginMessage.data.length
                ) {
                    for (let color of event.data.pluginMessage.data) {
                        colors.push({
                            title: color,
                            value: color,
                        })
                    }
                } else {
                    colors = [
                        {
                            title: '#000000',
                            value: '#000000',
                        },
                    ]
                }
                this.setColors(colors)
            }
        },
        ...mapMutations(['changeActiveColor', 'setColors', 'setGlobalActiveColorSource']),
    },
    watch:{
        activeMainTab() {
            if(this.globalActiveColorSource && this.globalActiveColorSource == 'local-styles') {
                this.activeColorSourceTab = 'local-styles'
            }
        }
    },
    filters: {
        formatColor(color) {
            return color.match(/[\d,%.]+/)[0]
        },
    },
    mixins: [tabsMixin],
}
</script>
