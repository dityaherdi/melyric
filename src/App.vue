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
          <fieldset class="uk-fieldset">
              <div class="uk-margin">
                  <input class="uk-input" required v-model="artist" style="text-align: center;" type="text" placeholder="Artist">
              </div>
              <div class="uk-margin">
                  <input @keyup.enter="find" class="uk-input" required v-model="title" style="text-align: center;" type="text" placeholder="Song's Title">
              </div>
              <button class="uk-button uk-button-primary uk-width-1-1" @click.prevent="find">Find Lyrics</button>
          </fieldset>
          <hr class="uk-divider-icon">
          <div class="uk-padding-small">
            <button @click="loginSpotify" class="uk-button uk-button-small spotify-button">
              <img src="/img/logos/spotify.svg" width="20px" alt="">
              Login with Spotify to get instant lyric.
            </button>
          </div>
          <button @click="getCurrentPlayback">Get Current Playback</button>
				</div>
			</div>
			</div>
			<!-- /CONTENT -->

			<!-- footer here -->
      <AppFooter />
		</div>
		
    <Drawer />
    <LyricModal />
    <Loading :active.sync="isLoading" :is-full-page="true" color="hsl(171, 100%, 41%)" loader="dots"/>
  </div>
</template>

<script>
import lyric from 'lyric-get'
import axios from 'axios'
import Event from './helpers/event'
import Loading from 'vue-loading-overlay'
import spotifyAPI from 'spotify-web-api-node'
const spotify = new spotifyAPI()

export default {
  data: function () {
    return {
      artist: null,
      title: null,
      isLoading: false,
      me: null,
      token: null,
      albumCover: null,
      albumName: null,
      releaseDate: null
    }
  },
  components: {
    AppNavbar: () => import('./components/parts/Navbar'),
    AppFooter: () => import('./components/parts/Footer'),
    LyricModal: () => import('./components/parts/modals/LyricModal'),
    Drawer: () => import('./components/parts/Drawer'),
    Loading
  },
  mounted() {
    this.token = this.getHashParams()
  },
  methods: {
    find: async function () {
      this.loadingHandler()
      try {
        const response = await axios.get(`https://lyric-api.herokuapp.com/api/find/${ this.artist }/${ this.title }`)
        const { status, data: { lyric, err } } = response
        const item = {
          artist: this.artist,
          title: this.title,
          lyric,
          albumCover: this.albumCover,
          albumName: this.albumName,
          releaseDate: this.releaseDate
        }
        if (err === 'none') {
          Event.$emit('show:LyricModal', item)
          this.loadingHandler()
        } else {
          alert('lyrics not found')
          this.loadingHandler()
        }
      } catch (error) {
        alert(error) 
      }
    },
    loadingHandler: function () {
      this.isLoading = !this.isLoading
    },
    loginSpotify: function () {
      window.location = 'http://localhost:3000/api/spotify/login'
    },
    getCurrentPlayback: async function () {
      spotify.setAccessToken(this.token.access_token)
      try {
        const response = await spotify.getMyCurrentPlaybackState()
        this.artist = response.body.item.artists[0].name
        this.title = response.body.item.name
        this.albumCover = response.body.item.album.images[0].url
        this.albumName = response.body.item.album.name
        this.releaseDate = response.body.item.album.release_date
        await this.find()
      } catch (error) {
        console.log(error)
      }
    },
    getHashParams: function () {
      let hashParams = {};
      let e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }
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
.spotify-button {
  background-color: #1db954;
  color: #191414;
}
</style>
