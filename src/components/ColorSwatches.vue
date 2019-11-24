<template>
    <div class="color-swatches">
        <div v-for="(color,index) in colors" :key="index" class="color-swatches__item" :style="'background:' + color" @click="selectColor(color)" />
    </div>
</template>
<script>
export default {
    props: {
        colors: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        selectColor(color) {
            this.$emit('selectColor', color)
        }
    }
}
</script>
