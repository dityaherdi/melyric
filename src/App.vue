<template>
  <div id="app">
    <div class="uk-light wrap uk-background-norepeat uk-background-cover uk-background-center-center uk-cover-container uk-background-secondary">
      <div class="uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-position-z-index uk-position-relative" data-uk-height-viewport="min-height: 400">

			<!-- navbar here -->
      <AppNavbar />

			<!-- CONTENT -->
			<div class="uk-container uk-container-small uk-flex-auto uk-text-center" data-uk-scrollspy="target: > .animate; cls: uk-animation-slide-bottom-small uk-invisible; delay: 300">
				<h1 class="uk-heading-primary animate uk-invisible" style="font-weight: 700;">Find The Lyrics.</h1>
				<div class="uk-width-4-5@m uk-margin-auto animate uk-invisible">
          <!-- <form @submit.prevent="find"> -->
            <fieldset class="uk-fieldset">
                <div class="uk-margin">
                    <input class="uk-input" required v-model="artist" style="text-align: center;" type="text" placeholder="Artist">
                </div>
                <div class="uk-margin">
                    <input class="uk-input" required v-model="title" style="text-align: center;" type="text" placeholder="Song's Title">
                </div>
                <button class="uk-button uk-button-primary" @click.prevent="find">Primary</button>
            </fieldset>
          <!-- </form> -->
          <!-- <a class="uk-button uk-button-default" href="javascript:void(0)" @click="showLyricModal">Open</a> -->
				</div>
			</div>
			</div>
			<!-- /CONTENT -->

			<!-- footer here -->
      <AppFooter />
		</div>
		
    <Drawer />
    <LyricModal />
  </div>
</template>

<script>
import lyric from 'lyric-get'
import axios from 'axios'
import Event from './helpers/event'

export default {
  data: function () {
    return {
      // lyric: null,
      artist: null,
      title: null
    }
  },
  components: {
    AppNavbar: () => import('./components/parts/Navbar'),
    AppFooter: () => import('./components/parts/Footer'),
    LyricModal: () => import('./components/parts/modals/LyricModal'),
    Drawer: () => import('./components/parts/Drawer')
  },
  methods: {
    find: async function () {
      try {
        const response = await axios.get(`https://lyric-api.herokuapp.com/api/find/${ this.artist }/${ this.title }`)
        const { status, data: { lyric, err } } = response
        if (err === 'none') {
          // this.lyric = null
          // this.lyric = lyric
          Event.$emit('show:LyricModal', lyric)
        } else {
          console.log('lyrics not found')
        }
      } catch (error) {
        console.log(error) 
      }
    },
    // showLyricModal: function () {
    //   Event.$emit('show:LyricModal', this.lyric)
    // }
  }
}
</script>

<style lang="less" scoped>
.wrap::before {
    position: absolute;
    height: 100vh;
    width: 100vw;
    content: '';
    z-index: 1;
    background-color: rgba(0,0,0,0.5);
}
.lead {
    font-size: 1.175em;
    font-weight: 300;
}
.uk-logo img {
    height: 28px;
}
</style>
