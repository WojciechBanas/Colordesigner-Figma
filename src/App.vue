<template>
    <div class="dialog">
        <div class="dialog__header">
            <div class="dialog__nav">
                <TabsNav :tabsList="mainTabs"  @tabChange="handleMainTabChange" :activeTab="activeMainTab"></TabsNav>
                <a href="https://colordesigner.io/tools?ref=figma" class="dialog__more-tools" target="_blank">More Tools</a>
            </div>
        </div>
        <div class="dialog__body">
            <div class="dialog__sidebar">
                <ColorPalette />
            </div>
            <div class="dialog__content">
                <tabs :activeTab="activeMainTab">
                    <tab name="tints-shades">
                        <TabsNav :tabsList="shadesTabs" @tabChange="handleShadeTabChange" :activeTab="activeShadesTab"></TabsNav>
                        <tabs :activeTab="activeShadesTab">
                            <tab name="tints">
                                <div class="dialog__section">
                                    <h2 class="dialog__section-title">Tints</h2>
                                    <RangeSlider :min="1" :max="40" :start="15" @update="updateTintsValue" />
                                    <ColorList :colors="tints" @colorSelect="selectColor" @showImages="openImagesList" />
                                </div>
                            </tab>
                            <tab name="shades">
                                <div class="dialog__section">
                                    <h2 class="dialog__section-title">Shades</h2>
                                    <RangeSlider :min="1" :max="40" :start="15" @update="updateShadesValue" />
                                    <ColorList :colors="shades" @colorSelect="selectColor" @showImages="openImagesList" />
                                </div>
                            </tab>
                            <tab name="color-harmonies">
                                <div class="dialog__section">
                                    <h2 class="dialog__section-title">Color Harmonies</h2>
                                    <TabsNav size="sm" :tabsList="colorHarmoniesTabs" @tabChange="handleColorHarmoniesTabChange" :activeTab="activeColorHarmoniesTab"></TabsNav>
                                    <tabs :activeTab="activeColorHarmoniesTab">
                                        <tab name="complementary">
                                            <ColorList :colors="colorHarmonies.complementary" @colorSelect="selectColor" @showImages="openImagesList"/>
                                        </tab>
                                        <tab name="analogous">
                                            <ColorList :colors="colorHarmonies.analogous" @colorSelect="selectColor" @showImages="openImagesList"/>
                                        </tab>
                                        <tab name="split-complementary">
                                            <ColorList :colors="colorHarmonies.splitComplementary" @colorSelect="selectColor" @showImages="openImagesList"/>
                                        </tab>
                                        <tab name="triad">
                                            <ColorList :colors="colorHarmonies.triad" @colorSelect="selectColor" @showImages="openImagesList"/>
                                        </tab>
                                        <tab  name="square">
                                            <ColorList :colors="colorHarmonies.square" @colorSelect="selectColor" @showImages="openImagesList"/>
                                        </tab>
                                        <tab name="rectangle">
                                            <ColorList :colors="colorHarmonies.rectangle" @colorSelect="selectColor" @showImages="openImagesList"/>
                                        </tab>
                                    </tabs>
                                </div>
                            </tab>
                        </tabs>
                    </tab>
                    <tab name="color-picker">
                        <TabsNav :tabsList="colorsTabs" @tabChange="handleNewColorTabChange"  :activeTab="activeColorsTab"></TabsNav>
                        <tabs :activeTab="activeColorsTab">
                            <tab name="green">
                                <ColorSwatches :colors="swatches.green" @selectColor="selectColor" />
                            </tab>
                            <tab name="blue">
                                <ColorSwatches :colors="swatches.blue" @selectColor="selectColor" />
                            </tab>
                            <tab name="red">
                                <ColorSwatches :colors="swatches.red" @selectColor="selectColor" />
                            </tab>
                            <tab name="orange">
                                <ColorSwatches :colors="swatches.orange" @selectColor="selectColor" />
                            </tab>
                            <tab name="purple">
                                <ColorSwatches :colors="swatches.purple" @selectColor="selectColor" />
                            </tab>
                            <tab name="yellow">
                                <ColorSwatches :colors="swatches.yellow" @selectColor="selectColor" />
                            </tab>
                            <tab name="grey">
                                <ColorSwatches :colors="swatches.grey" @selectColor="selectColor" />
                            </tab>
                        </tabs>
                    </tab>
                    <tab name="images">
                        <ImagesList></ImagesList>
                    </tab>
                </tabs>
            </div>
        </div>
        <footer class="dialog__footer">
        </footer>
        <ImagesListModal :visible="imagesListModal" :color="imagesListModalColor" @hide="imagesListModal = false"/>
        <Modal :open="addToAssetsModal" @hide="addToAssetsModal = false">
            <div class="color-info">
                <div class="color-info__color" :style="'background:' + selectedColor">
                </div>
                <div class="color-info__name form-group">
                    <label>Color:</label>
                    <input class="form-control" v-model="selectedColorName" ref="selectedColorName">
                </div>
                <div class="color-info__action">
                    <button class="btn btn--block" @click="colotColorFromModal">Copy Color</button>
                    <button class="btn btn--link btn--block" @click="addToAssetsModal = false">Close</button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import TabsNav from './components/tabs/TabsNav.vue'
import Tabs from './components/tabs/Tabs.vue'
import Tab from './components/tabs/tab.vue'
import tabsMixin from './tabs.js'

import ColorPalette from './components/ColorPalette.vue'
import ColorList from './components/ColorList.vue'
import RangeSlider from './components/RangeSlider.vue'
import Modal from './components/Modal.vue'
import ColorSwatches from './components/ColorSwatches.vue'
import ImagesList from './components/ImagesList.vue'
import ImagesListModal from './components/ImagesListModal.vue'

import {getTints, getShades, getColorHarmonies} from './utils/color-utils.js'
import swatches from './utils/swatches.js'

export default{
    data() {
        return {
            tints: [],
            tintsValue: 15,
            shades: [],
            swatches,
            shadesValue: 15,
            colorHarmonies: [],
            addToAssetsModal: false,
            selectedColor: '#000000',
            imagesListModal: false,
            imagesListModalColor: '#000000',
            selectedColorName: ''
        }
    },
    components:{
        ColorPalette,
        ColorList,
        RangeSlider,
        Modal,
        TabsNav,
        Tabs,
        Tab,
        ColorSwatches,
        ImagesList,
        ImagesListModal
    },
    computed: {
        ...mapState(['colors', 'activeColorIndex']),
        ...mapGetters(['activeColor'])
    },
    mounted() {
        this.generateTints()
        this.generateShades()
        this.generateColorHarmonies()
    },
    methods: {
        generateTints() {
            this.tints = getTints(this.activeColor.hex, this.tintsValue)
        },
        updateTintsValue(value) {
            this.tintsValue = value
        },
        generateShades(steps = 15) {
            this.shades = getShades(this.activeColor.hex, this.shadesValue)
        },
        generateColorHarmonies() {
            this.colorHarmonies = getColorHarmonies(this.activeColor.hex)
        },
        updateShadesValue(value) {
            this.shadesValue = value
        },
        selectColor(color){
            this.addToAssetsModal = true
            this.selectedColor = color
            this.selectedColorName = color
        },
        openImagesList(color) {
            this.imagesListModal = true
            this.imagesListModalColor = color
        },
        addColorToAssets(){
            this.addToAssetsModal = false
        },
        colotColorFromModal(){
            this.$refs.selectedColorName.select()
            document.execCommand("copy")
        },
        ...mapMutations(['setColors'])
    },
    watch: {
        activeColorIndex() {
            this.generateTints()
            this.generateShades()
            this.generateColorHarmonies()
        },
        colors() {
            this.generateTints()
            this.generateShades()
            this.generateColorHarmonies()
        },
        tintsValue() {
            this.generateTints()
        },
        shadesValue() {
            this.generateShades()
        }
    },
    mixins: [tabsMixin]
}
</script>
