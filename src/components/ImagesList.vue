<template>
    <div ref="imagesList" class="images-list">
        <div class="images-list__nav">
            <TabsNav
                :tabsList="tabs"
                @tabChange="handleTabChange"
                :activeTab="activePhrase"
            ></TabsNav>
        </div>
        <div class="images-list__list" v-if="!isLoading && !isError">
            <a
                class="images-list__image"
                :href="getAffilateURL(image)"
                v-for="(image, index) in activeImages"
                :key="index"
                target="_blank"
            ><img :src="image.thumbnail_url" />
            </a>
        </div>
        <div class="images-list__loader" v-if="isLoading">Loading...</div>
        <div class="images-list__error" v-if="isError">
            <h1 class="images-list__error-title">Oops! something went wrong</h1>
            <p class="images-list__error-desc">You can try to use the Adobe Stock search</p>
            <div class="images-list__error-actions">
                <button class="btn" @click="openAdobeStock">Open Adobe Stock</button>
                <button uxp-quiet="true" @click="getImages"> Try Again</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import {getAffilateURL} from './../utils/stock-utils'
import TabsNav from './tabs/TabsNav.vue'
import chroma from 'chroma-js'
export default {
    data() {
        return {
            activePhrase: 'background',
            watcher: null,
            isLoading: false,
            blockRequest: true,
            isError: false,
            lazyLoading: false,
            activeImages: [],
            color: '#000000',
            tabs: [
                {
                    label: 'Background',
                    name: 'background'
                },
                {
                    label: 'Texture',
                    name: 'texture'
                },
                {
                    label: 'Minimal',
                    name: 'minimal'
                },
                {
                    label: 'Pattern',
                    name: 'pattern'
                },
                {
                    label: 'Architecture',
                    name: 'architecture'
                },
                {
                    label: 'Landscape',
                    name: 'landscape'
                }
            ]
        }
    },
    components: {
        TabsNav
    },
    computed: {
        ...mapGetters(['activeColor']),
        ...mapState(['cachedImages'])
    },
    mounted() {
        this.getImages()
    },
    methods: {
        async getImages() {
            this.isError = false
            if (this.cachedImages[this.activePhrase]) {
                this.activeImages = this.cachedImages[this.activePhrase]
                return
            }
            if (this.watcher && !this.watcher.isInViewport) {
                return
            }
            this.isLoading = true
            const color = chroma(this.activeColor.hex).hex().substring(1)
            let images = null
            try {
                const response = await fetch(
                    `https://colordesigner.io/api/images/?color=${color}&phrase=${this.activePhrase}`
                )
                const images = await response.json()
                if (images) {
                    this.activeImages = images.files
                }
                this.cacheImages({
                    phrase: this.activePhrase,
                    images: this.activeImages
                })
            } catch (err) {
                this.isError = true
                this.removeCachedImages()
            }

            this.isLoading = false
        },
        getAffilateURL(image) {
            const stockURL = `https://stock.adobe.com/${image.id}`
            return getAffilateURL(stockURL)
        },
        handleTabChange(phrase) {
            this.activePhrase = phrase
        },
        openAdobeStock(){
            shell.openExternal('https://clk.tradedoubler.com/click?p(264338)a(3096280)g(22913782)epi(AdobeXd)epi2(error)url(https://stock.adobe.com)')
        },
        ...mapMutations(['cacheImages', 'removeCachedImages'])
    },
    watch: {
        activeColor() {
            this.removeCachedImages()
            this.getImages()
        },
        activePhrase() {
            this.getImages()
        },
        colors() {
            this.removeCachedImages()
            this.lazyLoading = true
        }
    }
}
</script>
