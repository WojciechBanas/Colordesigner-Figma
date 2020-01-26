<template>
    <div ref="imagesList" class="images-list">
        <a
        class="images-list__banner"
            href="https://clk.tradedoubler.com/click?p=264338&a=3096280&g=22903366"
            target="_BLANK"
        >
            <img
                src="https://imppl.tradedoubler.com/imp?type(img)g(22903366)a(3096280)"
                border="0"
            />
        </a>
        <div class="images-list__search">
            <input class="form-control" v-model="activePhrase" @keyup.enter="getImages" />
            <button class="btn btn--block" @click="getImages">Search</button>
        </div>
        <div class="images-list__nav">
            <TabsNav
                :tabsList="tabs"
                @tabChange="handleTabChange"
                :activeTab="activePhrase"
            ></TabsNav>
        </div>
        <div class="images-list__loader" v-show="isLoading">Loading...</div>
        <div class="images-list__error" v-show="isError">
            <h1 class="images-list__error-title">Oops! something went wrong</h1>
            <p class="images-list__error-desc">You can try to use the Adobe Stock search</p>
            <div class="images-list__error-actions">
                <button class="btn" @click="openAdobeStock">Open Adobe Stock</button>
                <button class="btn btn--link" @click="getImages"> Try Again</button>
            </div>
        </div>
        <div class="images-list__list"
        :style="{
            opacity: isLoading ? '0' : '1'
        }"
        >
            <a
                class="images-list__image"
                :href="getAffilateURL(image)"
                v-for="(image, index) in activeImages"
                :key="index"
                target="_blank"
            >
                <img :src="image.thumbnail_url" @load="loadedImages++" />
            </a>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import { getAffilateURL } from './../utils/stock-utils'
import TabsNav from './tabs/TabsNav.vue'
import chroma from 'chroma-js'
export default {
    data() {
        return {
            activePhrase: 'background',
            isLoading: false,
            isError: false,
            activeImages: [],
            color: '#000000',
            loadedImages: 0,
            imagesToLoad: 1000,
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
            this.loadedImages = 0
            this.imagesToLoad = 1000
            this.isLoading = true
            const color = chroma(this.activeColor.hex).hex().substring(1)
            let images = null
            try {
                const response = await fetch(
                    `https://colordesigner.io/api/images/?color=${color}&phrase=${this.activePhrase}`
                )
                const images = await response.json()
                if (images) {
                    if (images.files.status === 'error' || !images.files.length) {
                        this.isError = true
                        this.isLoading = false
                        this.removeImages()
                    } else {
                        this.imagesToLoad = images.files.length
                        this.activeImages = images.files
                        this.cacheImages({
                            phrase: this.activePhrase,
                            images: this.activeImages
                        })
                    }
                }
            } catch (err) {
                this.isError = true
                this.isLoading = false
                this.removeCachedImages()
            }
        },
        getAffilateURL(image) {
            const stockURL = `https://stock.adobe.com/${image.id}`
            return getAffilateURL(stockURL)
        },
        handleTabChange(phrase) {
            this.activePhrase = phrase
            this.getImages()
        },
        openAdobeStock(){
            shell.openExternal('https://clk.tradedoubler.com/click?p(264338)a(3096280)g(22913782)epi(Figma)epi2(error)url(https://stock.adobe.com)')
        },
        removeImages() {
            this.loadedImages = 0
            this.imagesToLoad = 1000
            this.cachedImages = {}
            this.activeImages = []
        },
        ...mapMutations(['cacheImages', 'removeCachedImages'])
    },
    watch: {
        activeColor() {
            this.removeCachedImages()
            this.getImages()
        },
        colors() {
            this.removeCachedImages()
        },
        loadedImages() {
            if (this.loadedImages >= this.imagesToLoad / 2) {
                this.isLoading = false
            }
        }
    }
}
</script>
