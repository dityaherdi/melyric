<template>
    <!-- Modal -->
    <div id="modal-full" class="uk-modal-full" uk-modal>
        <div class="uk-modal-dialog">
          <button class="uk-modal-close-full uk-close-large" type="button" uk-close @click="hideModal"></button>
          <div class="uk-light uk-background-norepeat uk-background-center-center uk-background-secondary">
            <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex uk-flex-center" uk-grid>
                <div class="uk-padding uk-padding-remove-bottom">
                    <img uk-img :src="item.albumCover" alt="No Album Cover Available">
                    <hr uk-divider>
                </div>
                <div class="uk-padding">
                    <article class="uk-article">
                        <h5 class="make-center-align">{{ item.title }}</h5>
                        <p class="make-center-align uk-article-meta">Song by <a href="javascript:void(0)">{{ item.artist }}</a> in {{ item.releaseDate ? item.releaseDate : '' | yearOnly }}.</p>
                        <hr uk-divider class="uk-margin-remove">
                        <div class="overflow-area" id="lyricArea" uk-overflow-auto>
                            <p class="lyric-overflow">{{ item.lyric === null ? '' : item.lyric }}</p>
                        </div>
                    </article>
                    <hr uk-divider class="uk-margin-remove">
                    <p class="make-center-align uk-article-meta uk-margin-remove-bottom">Autoscroll {{ scrollRange }}</p>
                    <div class="uk-flex uk-flex-center make-center-align uk-margin-remove">
                        <a href="javascript:void(0)"
                            :uk-tooltip="scrollActive ? 'title: Stop Autoscroll' : 'title: Start Autoscroll'"
                            @click="scrollActiveSwitcher"
                            :uk-icon="scrollActive ? 'ban' : 'play-circle'"
                        ></a>
                        <template v-if="scrollActive">
                            <a href="javascript:void(0)"
                                class="uk-margin-small-left"
                                @click="increaseScrollSpeed"
                                uk-icon="icon: plus-circle"
                                uk-tooltip="title: Increase Speed"
                            ></a>
                            <a href="javascript:void(0)"
                                class="uk-margin-small-left"
                                @click="decreaseScrollSpeed"
                                uk-icon="icon: minus-circle"
                                uk-tooltip="title: Decrease Speed"
                            ></a>
                            <a href="javascript:void(0)"
                                class="uk-margin-small-left"
                                @click="goToFirstLine"
                                uk-icon="icon: push"
                                uk-tooltip="title: Stop & Go To First Line"
                            ></a>
                        </template>
                    </div>
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
                item: {},
                scroll: null,
                scrollActive: false,
                scrollDistance: 25,
                scrollTime: 2000
            }
        },
    created() {
        history.pushState(null, null, location.href)
        window.onpopstate = function () {
            const element = document.getElementById('modal-full')
            if (element) {
                UIkit.modal('#modal-full').hide();
            }
        }

        Event.$on('show:LyricModal', (item) => {
            console.log(item)
            this.item = item
            const element = document.getElementById('modal-full')
            if (element) {
                UIkit.modal('#modal-full').show()
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
                return `(speed +${displayNumber}x)`
            } else if (times > 0) {
                return `(speed -${times}x)`
            } else {
                return ''
            }
        }
    },
    methods: {
        hideLyricModal: function () {
            this.item = null
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
                UIkit.notification("Speed reached maximum limit", {status:'warning'})
            }
        },
        decreaseScrollSpeed: function () {
            if (this.scrollTime <= 4000 && this.scrollTime > 0) {
                this.startAutoScroll()
                this.scrollTime += 250
            } else {
                UIkit.notification("Speed reached minimum limit", {status:'warning'})
            }
        },
        goToFirstLine: function () {
            this.scrollActiveSwitcher()
            document.getElementById('lyricArea').scrollTop = 0
        },
        hideModal: function () {
            this.scroll = null
            this.stopAutoScroll()
            UIkit.modal('#modal-full').hide();
        }
    }
}
</script>

<style scoped lang="less">
.overflow-area {
    min-height: 65vh !important;
}
.lyric-overflow {
    white-space: pre-wrap;
    text-align: center;
}
.make-center-align {
    text-align: center !important;
}
</style>
