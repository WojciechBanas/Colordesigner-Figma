<template>
    <div class="range-slider">
        <div class="range-slider__input">
            <input class="form-control" v-model="activeValue" :min="min" :max="max" type="number" />
        </div>
        <input class="range-slider__main" type="range" :min="min" :max="max" :step="step" :value="activeValue" ref="slider" @input="handleChange" />
    </div>
</template>
<script>
export default {
    props: {
        min: {
            default: 1,
            type: Number
        },
        max: {
            default: 10,
            type: Number
        },
        step: {
            default: 1,
            type: Number
        },
        start: {
            default: 1,
            type: Number
        }
    },
    data() {
        return {
            activeValue: 0,
            sliderIsActive: false
        }
    },
    watch: {
        activeValue(value) {
            if(value > this.max){
                this.activeValue = value = this.max
            }
            if (!this.sliderIsActive) {
                this.setSliderValue(value)
            }
            this.$emit('update', this.activeValue)
        }
    },
    mounted() {
        this.activeValue = this.start
        this.setSliderValue(this.start)
    },
    methods: {
        handleChange(event) {
            this.activeValue = event.target.value
        },
        setSliderValue(value){
            this.$refs.slider.value = value
        }
    }
}
</script>
