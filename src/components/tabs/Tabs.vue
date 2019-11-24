<template>
    <div class="tab-content">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        activeTab:{
            type: String,
            required: true
        }
    },
    data() {
        return {
            tabsList: [],
            activeTabIndex: 0
        }
    },
    mounted() {
        this.getInitialActiveTab()
    },
    methods: {
        getInitialActiveTab() {
            for(const [index, tab]  of this.tabsList.entries()){
                if(tab.name === this.activeTab){
                    this.activeTabIndex = index;
                }
            }
            this.tabsList[this.activeTabIndex].showTab()
        }
    },
    watch:{
        activeTab(value){
            this.tabsList[this.activeTabIndex].hideTab()

            for(const [index, tab]  of this.tabsList.entries()){
                if(tab.name === this.activeTab){
                    this.activeTabIndex = index;
                }
            }

            this.tabsList[this.activeTabIndex].showTab()
        }
    }
}
</script>
