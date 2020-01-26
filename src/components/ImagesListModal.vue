<template>
    <Modal :open="open" class="modal--images-list" @hide="hide">
        <h1 class="modal__title">Search Images <a href="https://clk.tradedoubler.com/click?p(264338)a(3096280)g(22913782)epi(AdobeXD)epi2(10freephotos)url(https://stock.adobe.com)" target="_blank"  class="images-list__stock-promo"><span class="label">Get a 30-day trial</span></a></h1>
        <div class="modal__content">
            <div class="images-list">
                <div class="images-list__search">
                    <input class="form-control" v-model="activePhrase" @keyup.enter="getImages" />
                    <button class="btn" @click="getImages">Search</button>
                </div>
                <div class="images-list__nav">
                    <TabsNav
                        :tabsList="tabs"
                        @tabChange="handleTabChange"
                        :activeTab="activePhrase"
                    ></TabsNav>
                </div>
                <div class="images-list__loader" v-show="isLoading">
                    Loading...
                </div>
                <div class="images-list__error" v-show="isError">
                    <h1 class="images-list__error-title">Oops! something went wrong</h1>
                    <p class="images-list__error-desc">You can try to use the Adobe Stock search</p>
                    <div class="images-list__error-actions">
                        <button class="btn" @click="openAdobeStock">Open Adobe Stock</button>
                        <button class="btn btn--link" @click="open = false">Close</button>
                    </div>
                </div>
                <div
                    class="images-list__list"
                    :style="{
                        opacity: isLoading ? 0 : 1,
                        height: isLoading ? '0px' : '',
                        'max-height': isLoading ? '0px' : ''
                    }"
                >
                    <a
                        class="images-list__image"
                        :href="getAffilateURL(image)"
                        v-for="(image, index) in activeImages"
                        :key="index"
                        target="_blank"
                        ><img
                            :src="image.thumbnail_url"
                            @load="loadedImages++"
                        />
                    </a>
                </div>
            </div>
        </div>
        <button class="btn modal__close" @click="open = false">
            Close
        </button>
    </Modal>
</template>
<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import { getAffilateURL } from './../utils/stock-utils'

import TabsNav from './tabs/TabsNav.vue'
import Modal from './Modal.vue'
import chroma from 'chroma-js'

export default {
    components: {
        TabsNav,
        Modal
    },
    props: {
        color: {
            type: String,
            default: '#000000'
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            activePhrase: 'background',
            isLoading: false,
            blockRequest: true,
            isError: false,
            activeImages: [],
            open: false,
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
    mounted() {
        this.getImages()
    },
    methods: {
        async getImages() {
            this.isError = false
            this.isLoading = true
            this.loadedImages = 0
            this.imagesToLoad = 1000
            const color = this.color.substring(1)
            let images = null
            this.removeImages()
            try {
                const response = await fetch(
                    `https://colordesigner.io/api/images/?color=${color}&phrase=${this.activePhrase}`
                )
                const images = await response.json()
                if (images) {
                    if (
                        images.files.status === 'error' ||
                        !images.files.length
                    ) {
                        this.isError = true
                        this.isLoading = false
                        this.removeImages()
                    } else {
                        this.imagesToLoad = images.files.length
                        this.activeImages = images.files
                    }
                }
            } catch (err) {
                this.isError = true
                this.isLoading = false
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
        openAdobeStock() {
            shell.openExternal(
                'https://clk.tradedoubler.com/click?p(264338)a(3096280)g(22913782)epi(Figma)epi2(error)url(https://stock.adobe.com)'
            )
        },
        removeImages() {
            this.loadedImages = 0
            this.imagesToLoad = 1000
            this.cachedImages = {}
            this.activeImages = []
        },
        hide() {
            this.imagesListModal = false
            this.$emit('hide')
        }
    },
    watch: {
        visible(value) {
            if (value) {
                this.open = true
                this.removeImages()
                this.getImages()
            } else {
                this.open = false
            }
        },
        loadedImages() {
            if (this.loadedImages >= this.imagesToLoad / 2) {
                this.isLoading = false
            }
        }
    }
}
</script>
