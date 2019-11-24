<template>
    <div class="color-list">
        <div class="color-list__items">
            <div v-for="(color,index) in colors" :key="index" class="color-list__item">
                <div class="color-list__color" :style="'background:' + color" @click="handleColorSelect(color)" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    props: {
        colors: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        handleColorSelect(color){
            this.$emit('colorSelect', color)
        }
    },
    filters: {
    }
}
</script>
