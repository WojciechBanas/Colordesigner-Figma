<template>
    <div class="range-slider">
        <div class="range-slider__input">
            <input class="form-control" v-model="activeValue" :min="min" :max="max" type="number" />
        </div>
        <div ref="slider" class="range-slider__main" />
    </div>
</template>
<script>
import noUiSlider from 'nouislider'

export default {
    props: {
        min: {
            default: 1,
            type: Number,
        },
        max: {
            default: 10,
            type: Number,
        },
        step: {
            default: 1,
            type: Number,
        },
        start: {
            default: 1,
            type: Number,
        },
    },
    data() {
        return {
            activeValue: 0,
            sliderInstance: {},
            sliderIsActive: false,
        }
    },
    watch: {
        activeValue(value) {
            if (!this.sliderIsActive) {
                this.sliderInstance.set(value)
            }
        },
    },
    mounted() {
        this.initSlider()
        this.activeValue = this.start
        this.sliderInstance.set(this.start)
    },
    methods: {
        initSlider() {
            this.sliderInstance = noUiSlider.create(this.$refs.slider, {
                start: this.start,
                step: this.step,
                connect: [true, false],
                behaviour: 'tap',
                snap: false,
                range: {
                    min: this.min,
                    max: this.max,
                },
                cssPrefix: 'noUi-',
                cssClasses: {
                    target: 'target',
                    base: 'base',
                    origin: 'origin',
                    handle: 'handle',
                    handleLower: 'handle-lower',
                    handleUpper: 'handle-upper',
                    touchArea: 'touch-area',
                    horizontal: 'horizontal',
                    vertical: 'vertical',
                    background: 'background',
                    connect: 'connect',
                    connects: 'connects',
                    ltr: 'ltr',
                    rtl: 'rtl',
                    draggable: 'draggable',
                    drag: 'state-drag',
                    tap: 'state-tap',
                    active: 'active',
                    tooltip: 'tooltip',
                    pips: 'pips',
                    pipsHorizontal: 'pips-horizontal',
                    pipsVertical: 'pips-vertical',
                    marker: 'marker',
                    markerHorizontal: 'marker-horizontal',
                    markerVertical: 'marker-vertical',
                    markerNormal: 'marker-normal',
                    markerLarge: 'marker-large',
                    markerSub: 'marker-sub',
                    value: 'value',
                    valueHorizontal: 'value-horizontal',
                    valueVertical: 'value-vertical',
                    valueNormal: 'value-normal',
                    valueLarge: 'value-large',
                    valueSub: 'value-sub',
                },
                format: {
                    to(value) {
                        return value !== undefined && Math.round(value)
                    },
                    from(value) {
                        return value
                    },
                },
            })

            this.handleSliderEvnets()
        },
        handleSliderEvnets() {
            this.sliderInstance.on('update', () => {
                this.activeValue = this.sliderInstance.get()
                this.$emit('update', this.activeValue)
            })
            this.sliderInstance.on('change', () => {
                this.$emit('change', this.activeValue)
            })
            this.sliderInstance.on('slide', () => {
                this.$emit('slide', this.activeValue)
            })
            this.sliderInstance.on('start', () => {
                this.$emit('start', this.activeValue)
                this.sliderIsActive = true
            })
            this.sliderInstance.on('end', () => {
                this.$emit('end', this.activeValue)
                this.sliderIsActive = false
            })
        },
    },
}
</script>
