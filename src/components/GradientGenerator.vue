<template>
    <div class="gradient-generator">
        <div class="gradient-generator__colors">
            <div
                class="gradient-generator__color"
                :class="
                    colorPicker && activeColorPicker == 'firstColor'
                        ? 'is-active'
                        : ''
                "
                :style="'background:' + firstColor"
                @click="showColorPicker('firstColor')"
            >
                <svg
                    class="gradient-generator__picker-tringle"
                    width="20"
                    height="10"
                    viewBox="0 0 20 10"
                >
                    <path d="M10,0,20,10H0Z" />
                </svg>
                <div class="gradient-generator__edit-icon">
                    <svg
                        v-if="colorPicker && activeColorPicker == 'firstColor'"
                        xmlns="http://www.w3.org/2000/svg"
                        width="45.657"
                        height="45.657"
                        viewBox="0 0 45.657 45.657"
                    >
                        <g transform="translate(-3.172 -3.172)">
                            <line

                                x1="40"
                                y2="40"
                                transform="translate(6 6)"
                            />
                            <line

                                x2="40"
                                y2="40"
                                transform="translate(6 6)"
                            />
                        </g>
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="52"
                        height="43"
                        viewBox="0 0 52 43"
                    >
                        <g transform="translate(1 -1)">
                            <line

                                y1="15"
                                transform="translate(8 27)"
                            />
                            <line

                                y1="15"
                                transform="translate(8 3)"
                            />
                            <line

                                y1="19"
                                transform="translate(25 23)"
                            />
                            <line

                                y1="11"
                                transform="translate(25 3)"
                            />
                            <line

                                y1="11"
                                transform="translate(42 31)"
                            />
                            <line

                                y1="20"
                                transform="translate(42 3)"
                            />
                            <line

                                x2="13"
                                transform="translate(1 27)"
                            />
                            <line

                                x2="13"
                                transform="translate(18 14)"
                            />
                            <line

                                x2="13"
                                transform="translate(36 31)"
                            />
                        </g>
                    </svg>
                </div>
            </div>
            <div
                class="gradient-generator__invert-colors"
                @click="invertColors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="51.12"
                    height="41.366"
                    viewBox="0 0 51.12 41.366"
                >
                    <g transform="translate(1.827 -0.914)">
                        <path
                            d="M29.4,4V16.4H17"
                            transform="translate(17.066 1.064)"
                        />
                        <path
                            d="M1,26.4V14H13.4"
                            transform="translate(0 11.73)"
                        />
                        <path
                            d="M6.187,15.4A18.6,18.6,0,0,1,36.876,8.454l9.589,9.01M1,25.73l9.589,9.01A18.6,18.6,0,0,0,41.278,27.8"
                            transform="translate(0 0)"
                        />
                    </g>
                </svg>
            </div>
            <div
                class="gradient-generator__color"
                :class="
                    colorPicker && activeColorPicker == 'secondColor'
                        ? 'is-active'
                        : ''
                "
                :style="'background:' + secondColor"
                @click="showColorPicker('secondColor')"
            >
                <svg
                    class="gradient-generator__picker-tringle"
                    width="20"
                    height="10"
                    viewBox="0 0 20 10"
                >
                    <path d="M10,0,20,10H0Z" />
                </svg>
                <div class="gradient-generator__edit-icon">
                    <svg
                        v-if="colorPicker && activeColorPicker == 'secondColor'"
                        xmlns="http://www.w3.org/2000/svg"
                        width="45.657"
                        height="45.657"
                        viewBox="0 0 45.657 45.657"
                    >
                        <g transform="translate(-3.172 -3.172)">
                            <line

                                x1="40"
                                y2="40"
                                transform="translate(6 6)"
                            />
                            <line

                                x2="40"
                                y2="40"
                                transform="translate(6 6)"
                            />
                        </g>
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="52"
                        height="43"
                        viewBox="0 0 52 43"
                    >
                        <g transform="translate(1 -1)">
                            <line

                                y1="15"
                                transform="translate(8 27)"
                            />
                            <line

                                y1="15"
                                transform="translate(8 3)"
                            />
                            <line

                                y1="19"
                                transform="translate(25 23)"
                            />
                            <line

                                y1="11"
                                transform="translate(25 3)"
                            />
                            <line

                                y1="11"
                                transform="translate(42 31)"
                            />
                            <line

                                y1="20"
                                transform="translate(42 3)"
                            />
                            <line

                                x2="13"
                                transform="translate(1 27)"
                            />
                            <line

                                x2="13"
                                transform="translate(18 14)"
                            />
                            <line

                                x2="13"
                                transform="translate(36 31)"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <div v-show="colorPicker" class="gradient-generator__picker">
            <div class="color-palette">
                <TabsNav
                    :tabsList="colorSourceTabs"
                    size="sm"
                    @tabChange="handleColorSourceTabChange"
                    :activeTab="activeColorSourceTab"
                ></TabsNav
                ><tabs :activeTab="activeColorSourceTab">
                    <tab name="selected-layer">
                        <div class="color-palette__color-list">
                            <div
                                v-for="(color, index) of colorsFromSelection"
                                :key="index"
                                class="color-palette__color"
                                :style="'background:' + color.value"
                                @click="setColor(color.value)"
                                :title="color.name"
                            />
                        </div>
                        <div class="color-palette__no-data" v-if="noSelection">
                            <h4 class="color-palette__no-data-title">
                                No Colors
                            </h4>
                            <p class="color-palette__no-data-desc">
                                Try to select layers
                            </p>
                        </div>
                    </tab>
                    <tab name="color-picker">
                        <div
                            v-for="(color, index) of colorPickerColors"
                            :key="index"
                            class="color-palette__color-container"
                        >
                            <div
                                class="color-palette__container-overlayer"
                                @click="setColor(color.value)"
                            ></div>
                            <div
                                class="color-palette__color"
                                :style="'background:' + color.value"
                            ></div>
                            <div class="color-palette__color-name">
                                {{ color.name }}
                            </div>
                        </div>
                    </tab>
                </tabs>
            </div>
        </div>
        <div class="gradient-generator__options">
            <div class="gradient-generator__mode">
                <label class="h3 text-center">Mode:</label>
                <select @change="changeScaleMode($event)">
                    <option value="lch">LCH (recommended!)</option>
                    <option value="hsl">HSL</option>
                    <option value="lab">LAB</option>
                    <option value="rgb">RGB</option>
                    <option value="lrgb">LRGB</option>
                </select>
            </div>
            <div class="gradient-generator__range-container">
                <label class="h3 text-center">Steps:</label>
                <RangeSlider
                    class="gradient-generator__range"
                    :min="1"
                    :max="40"
                    :start="15"
                    @update="updateColorValue"
                />
            </div>
        </div>
        <ColorList
            class="gradient-generator__color-list"
            :colors="colors"
            @colorSelect="selectColor"
            @showImages="openImagesList"
        />
    </div>
</template>

<script>
const mapState = require('vuex').mapState
const mapMutations = require('vuex').mapMutations
const mapGetters = require('vuex').mapGetters
const tabsMixin = require('./../tabs.js').default
const RangeSlider = require('./RangeSlider.vue').default
const chroma = require('chroma-js')
const ColorList = require('./ColorList.vue').default

const TabsNav = require('./tabs/TabsNav.vue').default
const Tabs = require('./tabs/Tabs.vue').default
const Tab = require('./tabs/Tab.vue').default

export default {
    mixins: [tabsMixin],
    components: {
        RangeSlider,
        ColorList,
        TabsNav,
        Tabs,
        Tab,
    },
    data() {
        return {
            colors: [],
            colorValue: 15,
            scaleMode: 'lch',
            firstColor: '#fafa6e',
            secondColor: '#2A4858',
            activeColorPicker: 'firstColor',
            colorPicker: false,
        }
    },
    computed: {
        ...mapState([
            'colorsFromSelection',
            'colorPickerColors',
            'activeColorIndex',
            'activeColor',
            'noSelection',
        ]),
        ...mapGetters(['activeColor']),
        activeColor: {
            set(value) {
                this[this.activeColorPicker] = value
            },
            get() {
                return this[this.activeColorPicker]
            },
        },
    },
    watch: {
        colorValue() {
            this.generateGradient()
        },
        firstColor() {
            this.generateGradient()
        },
        secondColor() {
            this.generateGradient()
        },
        scaleMode() {
            this.generateGradient()
        },
    },
    mounted() {
        this.generateGradient()
    },
    methods: {
        generateGradient() {
            this.colors = chroma
                .scale([this.firstColor, this.secondColor])
                .mode(this.scaleMode)
                .colors(this.colorValue)
        },
        updateColorValue(value) {
            this.colorValue = value
        },
        changeScaleMode(event) {
            this.scaleMode = event.target.value
        },
        showColorPicker(pickerName) {
            if (this.colorPicker && pickerName === this.activeColorPicker) {
                this.colorPicker = false
            } else {
                this.colorPicker = true
            }
            this.activeColorPicker = pickerName
        },
        openImagesList(color) {
            this.$emit('openImagesList', color)
        },
        selectColor(color) {
            this.$emit('selectColor', color)
        },
        setColor(color) {
            this[this.activeColorPicker] = color
        },
        invertColors() {
            const tempColor = this.firstColor

            this.firstColor = this.secondColor
            this.secondColor = tempColor

            this.generateGradient()
        },
    },
}
</script>
