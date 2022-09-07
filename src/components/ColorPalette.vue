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
            @tabChange="setColorSourceTab"
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
        TabsNav
    },
    computed: {
        ...mapState([
            'colors',
            'activeColorIndex',
            'activeColor',
            'stockPromo',
            'activeColorSourceTab',
            'colorSourceTabs'
        ]),
        ...mapGetters(['activeColor'])
    },
    data() {
        return {
            dialogVisible: false,
            notData: ''
        }
    },
    mounted() {
    },
    methods: {
        showPaletteOnline() {
            let colors = this.colors.map(color => {
                return chroma(color.value)
                    .hex()
                    .substring(1)
            })
            colors = colors.join('-')
            window.open(
                `https://colordesigner.io/?presentationMode=true&from=figma#${colors}`,
                '_blank'
            )
        },
        ...mapMutations([
            'changeActiveColor',
            'setColors',
            'setColorSourceTab'
        ])
    },
    watch: {
        activeMainTab() {},
    },
    filters: {
        formatColor(color) {
            return color.match(/[\d,%.]+/)[0]
        }
    },
    mixins: [tabsMixin]
}
</script>
