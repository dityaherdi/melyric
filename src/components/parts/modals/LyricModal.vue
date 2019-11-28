<template>
    <!-- Modal -->
    <div id="modal-full" class="uk-modal-full" uk-modal>
        <div class="uk-modal-dialog">
          <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
          <div class="uk-light uk-background-norepeat uk-background-center-center uk-background-secondary">
            <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex uk-flex-center" uk-grid>
                <div class="uk-padding-large">
                    <img uk-img src="https://i.scdn.co/image/07c323340e03e25a8e5dd5b9a8ec72b69c50089d" alt="No Picture Available">
                </div>
                <div class="uk-padding">
                    <p class="uk-article-meta uk-margin-remove-bottom">Autoscroll {{ scrollRange }}</p>
                    <ul class="uk-iconnav">
                        <li><a href="javascript:void(0)" @click="scrollActiveSwitcher" :uk-icon="scrollActive ? 'icon: ban' : 'icon: play-circle'"></a></li>
                        <template v-if="scrollActive">
                            <li><a href="javascript:void(0)" @click="increaseScrollSpeed" uk-icon="icon: plus-circle"></a></li>
                            <li><a href="javascript:void(0)" @click="decreaseScrollSpeed" uk-icon="icon: minus-circle"></a></li>
                        </template>
                    </ul>
                    <article class="uk-article">
                        <h1 class="uk-article-title"><a class="uk-link-reset" href="">Heading</a></h1>
                        <p class="uk-article-meta">Song by <a href="#">Artist</a> in 2012.</p>
                        <div class="overflow-area" id="lyricArea" uk-overflow-auto>
                            <p class="lyric-overflow">{{ lyric === null ? '' : lyric }}</p>
                        </div>
                    </article>
                </div>
            </div>
          </div>
        </div>
    </div>
    <!-- Modal -->
</template>

<script>
import Event from './../../../helpers/event'
import UIkit from 'uikit'

export default {
  name: 'LyricModal',
  data: function () {
        return {
            lyric: null,
            scroll: null,
            scrollActive: false,
            scrollDistance: 25,
            scrollTime: 2000
        }
    },
    created() {
        Event.$on('show:LyricModal', (lyric) => {
            this.lyric = lyric
            const element = document.getElementById('modal-full')
            if (element) {
                UIkit.modal('#modal-full').show();
            }
        })
    },
    watch: {
        scrollActive: function (value) {
            if (value === true) {
                this.startAutoScroll()
            } else if (value === false) {
                this.stopAutoScroll()
            }
        }
    },
    computed: {
        scrollRange: function () {
            const counter = 250
            let times = (this.scrollTime / counter) - 8
            if (times < 0) {
                let displayNumber = Math.abs(times)
                return `+${displayNumber}x`
            } else if (times > 0) {
                return `-${times}x`
            } else {
                return ''
            }
        }
    },
    methods: {
        hideLyricModal: function () {
            this.lyric = null
            this.pauseAutoScroll()
            UIkit.modal('#modal-full').hide();
        },
        startAutoScroll: function () {
            this.pauseAutoScroll()
            this.scroll = setInterval(() => {
                const element = document.getElementById('lyricArea')
                if (element) {
                    element.scrollBy({ top: this.scrollDistance, left: 0, behavior: 'smooth' })
                } else {
                    return false
                }
            }, this.scrollTime)
        },
        pauseAutoScroll: function () {
            clearInterval(this.scroll)
        },
        stopAutoScroll: function () {
            this.scrollTime = 2000
            clearInterval(this.scroll)
        },
        scrollActiveSwitcher: function () {
            return this.scrollActive = !this.scrollActive
        },
        increaseScrollSpeed: function () {
            if (this.scrollTime > 0) {
                this.startAutoScroll()
                this.scrollTime -= 250
            } else {
                console.log('already at +8x speed')
            }
        },
        decreaseScrollSpeed: function () {
            if (this.scrollTime <= 4000 && this.scrollTime > 0) {
                this.startAutoScroll()
                this.scrollTime += 250
            } else {
                console.log('already at -8 speed')
            }
        }
    }
}
</script>

<style scoped lang="less">
.overflow-area {
    min-height: 50vh !important;
}
.lyric-overflow {
    white-space: pre-wrap;
    text-align: center;
}
</style>
