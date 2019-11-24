<template>
    <div class="tabs-nav"
        :class="[
        size ? 'tabs-nav--' + size : ''
        ]"
    >
        <div
        v-for="(tab,index) in tabsList"
        :key="index"
        @click="handleChange(index, tab.name)"
        class="tabs-nav__item"
        :class="[
           index === activeTabIndex ? 'is-active' : ''
        ]"
        ><span class="tabs-nav__item-inner">{{tab.label}}</span><div class="tabs-nav__item-overlayer" @click="handleChange(index, tab.name)"></div></div>
    </div>
</template>
<script>
export default {
    props: {
        tabsList: {
            type: Array,
            required: true,
        },
        size:{
            type: String,
        },
        activeTab: {
            type: String,
            required: true
        },
    },
    data(){
        return {
            activeTabIndex: 0
        }
    },
    mounted() {

        this.getInitialActiveTab()
    },
    methods:{
        handleChange(index, name) {
            this.activeTabIndex = index
            this.$emit('tabChange', name)
        },
        getInitialActiveTab() {
            for(const [index, tab]  of this.tabsList.entries()){
                if(tab.name === this.activeTab){
                    this.activeTabIndex = index;
                }
            }
        }
    }
}
</script>
