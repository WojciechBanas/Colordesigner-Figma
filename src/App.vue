<template>
    <div class="dialog">
        <div class="dialog__header">
            <div class="dialog__nav">
                <TabsNav
                    :tabsList="mainTabs"
                    @tabChange="handleMainTabChange"
                    :activeTab="activeMainTab"
                ></TabsNav>
                <a
                    href="https://colordesigner.io/tools?ref=figma"
                    class="dialog__more-tools"
                    target="_blank"
                    >More Tools</a
                >
            </div>
        </div>
        <div class="dialog__body">
            <div
                class="dialog__sidebar"
                v-if="activeMainTab != 'gradient-generator'"
            >
                <ColorPalette />
            </div>
            <div class="dialog__content">
                <tabs :activeTab="activeMainTab">
                    <tab name="tints-shades">
                        <TabsNav
                            :tabsList="shadesTabs"
                            @tabChange="handleShadeTabChange"
                            :activeTab="activeShadesTab"
                        ></TabsNav>
                        <tabs :activeTab="activeShadesTab">
                            <tab name="tints">
                                <div class="dialog__section">
                                    <div class="dialog__top">
                                        <h2 class="dialog__section-title">
                                            Tints
                                        </h2>
                                        <div
                                            class="dialog__top-action icon"
                                            title="Copy All Tints"
                                            @click="
                                                openColorAllColorsModal(
                                                    'shades'
                                                )
                                            "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="feather feather-copy"
                                            >
                                                <rect
                                                    x="9"
                                                    y="9"
                                                    width="13"
                                                    height="13"
                                                    rx="2"
                                                    ry="2"
                                                ></rect>
                                                <path
                                                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <RangeSlider
                                        :min="1"
                                        :max="40"
                                        :start="8"
                                        @update="updateTintsCounter"
                                    />
                                    <ColorList
                                        :colors="tints"
                                        @colorSelect="selectColor"
                                        @showImages="openImagesList"
                                    />
                                </div>
                            </tab>
                            <tab name="shades">
                                <div class="dialog__section">
                                    <div class="dialog__top">
                                        <h2 class="dialog__section-title">
                                            Shades
                                        </h2>
                                        <div
                                            class="dialog__top-action icon"
                                            title="Copy All Shades"
                                            @click="openColorAllColorsModal()"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="feather feather-copy"
                                            >
                                                <rect
                                                    x="9"
                                                    y="9"
                                                    width="13"
                                                    height="13"
                                                    rx="2"
                                                    ry="2"
                                                ></rect>
                                                <path
                                                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <RangeSlider
                                        :min="1"
                                        :max="40"
                                        :start="8"
                                        @update="updateShadesCounter"
                                    />
                                    <ColorList
                                        :colors="shades"
                                        @colorSelect="selectColor"
                                        @showImages="openImagesList"
                                    />
                                </div>
                            </tab>
                            <tab name="color-harmonies">
                                <div class="dialog__section">
                                    <div class="dialog__top">
                                        <h2 class="dialog__section-title">
                                            Color Harmonies
                                        </h2>
                                        <div
                                            class="dialog__top-action icon"
                                            title="Copy All Color Harmonies"
                                            @click="openColorAllColorsModal()"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="feather feather-copy"
                                            >
                                                <rect
                                                    x="9"
                                                    y="9"
                                                    width="13"
                                                    height="13"
                                                    rx="2"
                                                    ry="2"
                                                ></rect>
                                                <path
                                                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <TabsNav
                                        size="sm"
                                        :tabsList="colorHarmoniesTabs"
                                        @tabChange="
                                            handleColorHarmoniesTabChange
                                        "
                                        :activeTab="activeColorHarmoniesTab"
                                    ></TabsNav>
                                    <tabs :activeTab="activeColorHarmoniesTab">
                                        <tab name="complementary">
                                            <ColorList
                                                :colors="
                                                    colorHarmonies.complementary
                                                "
                                                @colorSelect="selectColor"
                                                @showImages="openImagesList"
                                            />
                                        </tab>
                                        <tab name="analogous">
                                            <ColorList
                                                :colors="
                                                    colorHarmonies.analogous
                                                "
                                                @colorSelect="selectColor"
                                                @showImages="openImagesList"
                                            />
                                        </tab>
                                        <tab name="split-complementary">
                                            <ColorList
                                                :colors="
                                                    colorHarmonies.splitComplementary
                                                "
                                                @colorSelect="selectColor"
                                                @showImages="openImagesList"
                                            />
                                        </tab>
                                        <tab name="triad">
                                            <ColorList
                                                :colors="colorHarmonies.triad"
                                                @colorSelect="selectColor"
                                                @showImages="openImagesList"
                                            />
                                        </tab>
                                        <tab name="square">
                                            <ColorList
                                                :colors="colorHarmonies.square"
                                                @colorSelect="selectColor"
                                                @showImages="openImagesList"
                                            />
                                        </tab>
                                        <tab name="rectangle">
                                            <ColorList
                                                :colors="
                                                    colorHarmonies.rectangle
                                                "
                                                @colorSelect="selectColor"
                                                @showImages="openImagesList"
                                            />
                                        </tab>
                                    </tabs>
                                </div>
                            </tab>
                        </tabs>
                    </tab>
                    <tab name="color-picker">
                        <TabsNav
                            :tabsList="colorsTabs"
                            @tabChange="handleNewColorTabChange"
                            :activeTab="activeColorsTab"
                        ></TabsNav>
                        <tabs :activeTab="activeColorsTab">
                            <tab name="green">
                                <ColorSwatches
                                    :colors="swatches.green"
                                    @selectColor="selectColor"
                                />
                            </tab>
                            <tab name="blue">
                                <ColorSwatches
                                    :colors="swatches.blue"
                                    @selectColor="selectColor"
                                />
                            </tab>
                            <tab name="red">
                                <ColorSwatches
                                    :colors="swatches.red"
                                    @selectColor="selectColor"
                                />
                            </tab>
                            <tab name="orange">
                                <ColorSwatches
                                    :colors="swatches.orange"
                                    @selectColor="selectColor"
                                />
                            </tab>
                            <tab name="purple">
                                <ColorSwatches
                                    :colors="swatches.purple"
                                    @selectColor="selectColor"
                                />
                            </tab>
                            <tab name="yellow">
                                <ColorSwatches
                                    :colors="swatches.yellow"
                                    @selectColor="selectColor"
                                />
                            </tab>
                            <tab name="grey">
                                <ColorSwatches
                                    :colors="swatches.grey"
                                    @selectColor="selectColor"
                                />
                            </tab>
                        </tabs>
                    </tab>
                    <tab name="gradient-generator">
                        <GradientGenerator
                            ref="gradientGenerator"
                            @openImagesList="openImagesList"
                            @selectColor="selectColor"
                            @openColorAllColorsModal="handleGradientGeneratorColors"
                        ></GradientGenerator>
                    </tab>
                    <tab name="images">
                        <ImagesList></ImagesList>
                    </tab>
                </tabs>
            </div>
        </div>
        <footer class="dialog__footer"></footer>
        <ImagesListModal
            :visible="imagesListModal"
            :color="imagesListModalColor"
            @hide="imagesListModal = false"
        />
        <Modal :open="addToAssetsModal" @hide="addToAssetsModal = false">
            <div class="color-info">
                <div
                    class="color-info__color"
                    :style="'background:' + selectedColor"
                ></div>
                <div class="color-info__name form-group">
                    <label>Color:</label>
                    <input
                        class="form-control"
                        v-model="selectedColorName"
                        ref="selectedColorName"
                    />
                </div>
                <div class="color-info__action">
                    <button class="btn btn--block" @click="colorsColorFromModal">
                        Copy Color
                    </button>
                    <button
                        class="btn btn--link btn--block"
                        @click="addToAssetsModal = false"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
        <Modal
            :open="copyAllColorModal"
            class="modal--images-list"
            @hide="copyAllColorModal = false"
        >
            <h1 class="modal__title">Copy All Colors</h1>
            <div class="modal__content">
                <textarea
                    ref="allColors"
                    class="form-control"
                    v-model="textAreaColors"
                    readonly
                    cols="30"
                    rows="22"
                />
            </div>
            <div class="modal__action">
                <button class="btn btn--block" @click="copyAllColors">
                    Copy All Colors
                </button>
                <button
                    class="btn btn--link btn--block modal__close"
                    @click="copyAllColorModal = false"
                >
                    Close
                </button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import TabsNav from './components/tabs/TabsNav.vue'
import Tabs from './components/tabs/Tabs.vue'
import Tab from './components/tabs/Tab.vue'
import tabsMixin from './tabs.js'

import ColorPalette from './components/ColorPalette.vue'
import GradientGenerator from './components/GradientGenerator.vue'
import ColorList from './components/ColorList.vue'
import RangeSlider from './components/RangeSlider.vue'
import Modal from './components/Modal.vue'
import ColorSwatches from './components/ColorSwatches.vue'
import ImagesList from './components/ImagesList.vue'
import ImagesListModal from './components/ImagesListModal.vue'

import { getTints, getShades, getColorHarmonies } from './utils/color-utils.js'
import swatches from './utils/swatches.js'
export default {
    data() {
        return {
            tints: [],
            tintsCounter: 8,
            shades: [],
            swatches,
            shadesCounter: 8,
            textareaHeight: 8,
            colorHarmonies: [],
            addToAssetsModal: false,
            copyAllColorModal: false,
            selectedColor: '#000000',
            imagesListModal: false,
            imagesListModalColor: '#000000',
            selectedColorName: '',
            gradientGeneratorColors: []
        }
    },
    components: {
        ColorPalette,
        ColorList,
        GradientGenerator,
        RangeSlider,
        Modal,
        TabsNav,
        Tabs,
        Tab,
        ColorSwatches,
        ImagesList,
        ImagesListModal,
    },
    computed: {
        ...mapState(['colors', 'activeColorIndex']),
        ...mapGetters(['activeColor']),
        textAreaColors() {
            if(this.activeMainTab == 'gradient-generator'){
                return this.gradientGeneratorColors.map((color) => color + '\n').join('')
            }else{
                if (this.activeShadesTab == 'tints') {
                    return this.tints.map((color) => color + '\n').join('')
                } else if (this.activeShadesTab == 'shades') {
                    return this.shades.map((color) => color + '\n').join('')
                } else if (this.activeShadesTab == 'color-harmonies') {
                    let textareaContent = ``
                    for (const [name, colors] of Object.entries(
                        this.colorHarmonies
                    )) {
                        textareaContent += `//${name} \n`
                        textareaContent += colors
                            .map((color) => color + '\n')
                            .join('')
                    }
                    return textareaContent
                }
            }
        },
    },
    mounted() {
        this.generateTints()
        this.generateShades()
        this.generateColorHarmonies()
    },
    methods: {
        generateTints() {
            this.tints = getTints(this.activeColor.hex, this.tintsCounter)
        },
        updateTintsCounter(value) {
            this.tintsCounter = value
        },
        generateShades() {
            this.shades = getShades(this.activeColor.hex, this.shadesCounter)
        },
        generateColorHarmonies() {
            this.colorHarmonies = getColorHarmonies(this.activeColor.hex)
        },
        updateShadesCounter(value) {
            this.shadesCounter = value
        },
        selectColor(color) {
            this.addToAssetsModal = true
            this.selectedColor = color
            this.selectedColorName = color
        },
        openImagesList(color) {
            this.imagesListModal = true
            this.imagesListModalColor = color
        },
        addColorToAssets() {
            this.addToAssetsModal = false
        },
        colorsColorFromModal() {
            this.$refs.selectedColorName.select()
            document.execCommand('copy')
        },
        copyAllColors() {
            this.$refs.allColors.select()
            document.execCommand('copy')
        },
        openColorAllColorsModal() {
            this.copyAllColorModal = true
        },
        handleGradientGeneratorColors(colors) {
            this.gradientGeneratorColors = colors
            this.openColorAllColorsModal()
        },
        ...mapMutations(['setColors']),
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
        tintsCounter() {
            this.generateTints()
        },
        shadesCounter() {
            this.generateShades()
        },
    },
    mixins: [tabsMixin],
}
</script>
