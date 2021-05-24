<template>
    <div class="color-palette">
        <div class="color-palette__active-color" :style="'background:' + colors[activeColorIndex].value" />
        <TabsNav  class="color-palette__tabs" size="sm" :tabsList="tabs"  @tabChange="handleTabChange" :activeTab="activeTab"></TabsNav>
        <div class="color-palette__color-list">
            <div v-for="(color,index ) of colors" :key="index" class="color-palette__color" :style="'background:' + color.value" @click="changeActiveColor(index)" :title="color.name"/>
        </div>
        <div class="color-palette__actions">
            <button class="btn btn--sm btn--block" v-if="activeTab == 'selection'"  @click="getColorsFromSelection" >Load Selection</button>
            <button class="btn btn--link btn--sm btn--block"  @click="showPaletteOnline">View Palette Online</button>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import Tabs from './tabs/Tabs.vue'
import Tab from './tabs/Tab.vue'
import chroma from 'chroma-js'
import TabsNav from './tabs/TabsNav.vue'

export default {
    components:{
        TabsNav
    },
    computed: {
        ...mapState(['colors', 'activeColorIndex', 'activeColor', 'stockPromo']),
        ...mapGetters(['activeColor'])
    },
    data() {
        return {
            dialogVisible: false,
            activeTab: 'selection',
            notData: "",
            tabs: [
                {
                    label: 'Selection',
                    name: 'selection'
                },
                {
                    label: 'Local Styles',
                    name: 'local-styles'
                }
            ]
        }
    },
    mounted() {
        if(this.activeTab == 'selection'){
            this.getColorsFromSelection()
        }else{
            this.getColorsFromLibrary()
        }
        this.handleMessage()
    },
    methods: {
        showPaletteOnline() {
            let colors = this.colors.map((color)=>{
                return chroma(color.value).hex().substring(1)
            })
            colors = colors.join('-')
            window.open(`https://colordesigner.io/?presentationMode=true&from=figma#${colors}`, '_blank');
        },
        handleTabChange(tab) {
            this.activeTab = tab
            if(tab === 'local-styles'){
                this.getColorsFromLibrary()
            }else{
                this.getColorsFromSelection()
            }
        },
        getColorsFromSelection() {
            parent.postMessage({ pluginMessage: 'getColorFromSelection' }, '*')
        },
        getColorsFromLibrary() {
            parent.postMessage({ pluginMessage: 'getColorsFromLibrary' }, '*')
        },
        handleMessage(){
            onmessage = (event) => {
                this.changeActiveColor(0)
                let colors = []
                if(event.data && event.data.pluginMessage.length){
                    for(let color of event.data.pluginMessage){
                        colors.push({
                            title: color,
                            value: color
                        })
                    }
                }else{
                    colors = [
                        {
                            title: '#000000',
                            value: '#000000'
                        }
                    ]
                }
                this.setColors(colors)
            }
        },
        ...mapMutations(['changeActiveColor', 'setColors'])
    },
    filters: {
        formatColor(color) {
            return color.match(/[\d,%.]+/)[0]
        }
    }
}
</script>
