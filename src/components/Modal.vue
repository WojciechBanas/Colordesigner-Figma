<template>
    <div
    class="modal"
    :class="[
        isOpen ? 'is-open' : ''
    ]"
    >
        <div class="modal__overlayer" @click="hide">

        </div>
        <div class="modal__dialog">
        <div class="modal__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        open:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods:{
        show(){
            this.isOpen = true
            this.$emit('show')
        },
        hide(){
            this.isOpen = false
            this.$emit('hide')
        }
    },
    watch: {
        open(value){
            if(value){
                this.show()
            }else{
                this.hide()
            }
        }
    },
}
</script>
