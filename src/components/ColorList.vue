<template>
    <div class="color-list">
        <div class="color-list__items">
            <div v-for="(color,index) in colors" :key="index" class="color-list__item">
                <div class="color-list__color" :style="'background:' + color">
                    <div class="color-list__actions">
                        <div class="color-list__action" @click="handleColorSelect(color)"><img @click="handleColorSelect(color)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABHNCSVQICAgIfAhkiAAAAXRJREFUaIHtm9FtwkAMhu2IAdKJSjeDSWAEOgHpBmySMMHPw0VthWJ04Tg7OP5eI8f+lFz0n+CIRgBsAZwB9PBDj+S0pf8A2BkPpsGOiIiR7M+0Dr4YQEdEn9aTKPHDAHoiaq0nUWJgALCeQpONdIGZWXOQVyM9yEZ7EGtC2Dsh7J0Q9k4I1wRAC+CAvy3oAYBurJX2UpV6nSZaHSv1mkTM0jWipdBrYOYPpV6LWMOqr/QShFUJYe+EsHdC2DshPIeJbPyQB/fJpTx7zx3urnYqG9cmK3tLxUVZWqqtTFb2lmZ7xzVctKkpFf4urH+GU1G19K5n1rZI63h46SqVOSLzoyXdYAn7YdVe77iGiwhh74Swd0LYOyFswFWzmbbwVPYuy8ZzkTJnpV732Ts7Gz/Ryz5LaxJZeiSEvRPC3glh76xOeHV/EG9IObwbc22I6GI9hSKX1R3jaZi5I6K99SQK7EfXBNJRvA56P5toMCA5/R7FuwEagUBjJx7DHAAAAABJRU5ErkJggg=="></div>
                        <div class="color-list__action" @click="showImages(color)"><img @click="showImages(color)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAABHNCSVQICAgIfAhkiAAAArRJREFUaIHt2z9yEzEUBvBPHjqGGYcZOopAwaSDI4Qb+AjcgOEG9gnoKGCYmIpUxDdIaijiDPQcwcsJPoqVPSJ4/SStnqS1/XVO9Of9Vl5ZxS5gQ/Kc5DXJFfcnK7amc2wLyWnhAnNk6poN26txvfWK7F9eG2NuAGAEYCo03qdsrIbkCsC4YDE50xhjToAWztLV5IwxxgDAA6nBUCMt6ChXIbXlCD+0HOGHlt5wkhOSFyRv7dHw1n6epChQLV0HW49+Y5JXwvn4imSRw5Hk6jzA7Podt5jf8DvxNQCeGWOa0OL7RHLFftXn8D/mjgFcRM6jl9Cvur2nY5L1npdcMSseC6hqs4uBv+r4+wzACYB3Hf9/GTGXWoI3N6k9yVO0G5/3mBrR2NzuOiZ6a3f7NyH9fELylORZbP+uQUM3t3nk5jaPrO+9M8bnZK4IeLZdneTHLeN8JSl+U5PDbZ9FIHqRCL3ONwmvBR+TbDzRDQOPrQLaC68Cd/DSyi+U0CJeDe70n7Dd8Ja269J+jrmnPwSg17ksAk8Vhq30/fy38oOAU17pnyR/CG0u741ZN5zySv9iu588JPldaLtZ+arhvminvTe+WjjJLyHoCHx98Fh0IL4ueF90X3wReCp0H3x2eGq0M24Q3u2oDtdCO+N7491OqnBttDOPF97toAbPhXbm88E/WTdWgedGO/NK+KfrhsnhJD8J6DuSj5NIt8//SHSlhpdGO3Xkg3uglznQtpY8cBa6p3fUow+vDW1r0oXXiLZ16cFrRdvadOA1o2196eG1o22NaeFDQNs608GHggYSwoeEBhLBh4YGEsCHiAZ6POe2r3EfBflTuJac2VhHAJYFC8mdjfVg30Ia2fewZgWLyZXZ+p2zf8L2Fcsb+j/iMYQ0bE3bX7HcFZIvSD5PccmPqSB/AeBYaFdlJcADAAAAAElFTkSuQmCC" ></div>
                    </div>
                </div>
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
        },
        handleColorSelect(color){
            this.$emit('colorSelect', color)
        },
        showImages(color){
            this.$emit('showImages', color)
        }
    },
    filters: {
    }
}
</script>
