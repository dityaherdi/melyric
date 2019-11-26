<template>
  <!-- Modal -->
    <div id="modal-full" class="uk-modal-full" uk-modal>
        <div class="uk-modal-dialog">
          <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
          <div class="uk-light uk-background-norepeat uk-background-cover uk-background-center-center uk-cover-container uk-background-secondary">
            <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                <div class="uk-background-cover" style="background-image: url('https://i.scdn.co/image/07c323340e03e25a8e5dd5b9a8ec72b69c50089d');" uk-height-viewport></div>
                <div class="uk-padding-large">
                    <h1>Title</h1>
                    <div class="uk-overflow-auto" uk-overflow-auto>
                      <p style="white-space:pre-wrap;">{{ lyric === null ? '' : lyric }}</p>
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
            lyric: null
        }
    },
    created() {
        Event.$on('show:LyricModal', (lyric) => {
            this.lyric = lyric
            UIkit.modal('#modal-full').show();
        })
    },
    methods: {
        hideLyricModal: function () {
            this.lyric = null
            UIkit.modal('#modal-full').hide();
        }
    }
}
</script>

<style scoped lang="less">

</style>
