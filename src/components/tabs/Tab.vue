<template>
    <div v-if="isActive">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        active: {
            type: [Boolean, String],
            default: false
        },
    },
    data() {
        return {
            isActive: false,
        }
    },
    created() {
        this.$parent.tabsList.push(this)
    },
    methods:{
        showTab() {
            this.isActive = true
        },
        hideTab() {
            this.isActive = false
        }
    }
}
</script>
