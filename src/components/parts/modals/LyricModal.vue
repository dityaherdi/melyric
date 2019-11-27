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
                    <p class="uk-article-meta uk-margin-remove-bottom">Autoscroll</p>
                    <ul class="uk-iconnav">
                        <li><a href="javascript:void(0)" @click="scrollActiveSwitcher" :uk-icon="scrollActive ? 'icon: ban' : 'icon: play-circle'"></a></li>
                        <li><a href="javascript:void(0)" uk-icon="icon: plus-circle"></a></li>
                        <li><a href="javascript:void(0)" uk-icon="icon: minus-circle"></a></li>
                    </ul>
                    <article class="uk-article">
                        <h1 class="uk-article-title"><a class="uk-link-reset" href="">Heading</a></h1>
                        <p class="uk-article-meta">Song by <a href="#">Artist</a> in 2012.</p>
                        <div class="overflow-area" id="lyricArea" uk-overflow-auto>
                        <p style="white-space:pre-wrap;">{{ lyric === null ? '' : lyric }}</p>
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
            scrollActive: false
        }
    },
    created() {
        Event.$on('show:LyricModal', (lyric) => {
            this.lyric = lyric
            UIkit.modal('#modal-full').show();
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
    methods: {
        hideLyricModal: function () {
            this.lyric = null
            this.stopAutoScroll()
            UIkit.modal('#modal-full').hide();
        },
        startAutoScroll() {
            this.scroll = setInterval(() => {
                document.getElementById('lyricArea').scrollBy(0, 10)
            }, 1000)
        },
        stopAutoScroll() {
            clearInterval(this.scroll)
        },
        scrollActiveSwitcher() {
            return this.scrollActive = !this.scrollActive
        }
    }
}
</script>

<style scoped lang="less">
.overflow-area {
    min-height: 50vh !important;
}
</style>
