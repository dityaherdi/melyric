import * as type from './types'
import axios from 'axios'
import spotifyAPI from 'spotify-web-api-node'
import { currentUser } from './../../helpers/utilities'
const spotify = new spotifyAPI()

const actions = {
  loginSpotify({ commit }, payload) {
    let popupLogin = window.open('http://localhost:3000/api/spotify/login', 'Spotify Login', 'width=800,height=600')

    window.spotifyCallback = async (token) => {

      // Direct call to Spotify
      const { access_token, refresh_token } = token

      spotify.setAccessToken(access_token)
      spotify.setRefreshToken(refresh_token)
      
      try {
        const response = await spotify.getMe()
        if (response.statusCode == 200) {
          const { body } = response
          let user = Object.assign(body, { token: { access_token, refresh_token } })
          localStorage.setItem('melyricUser', JSON.stringify(user))
          commit(type.SPOTIFY_USER_LOGIN, user)
        }
      } catch (error) {
        console.log(error)
      }

      // Call to melyric-backend
      //
      popupLogin.close()
    }
  },
  async getCurrentPlaybackState({ commit }, payload) {
    try {
      const response = await spotify.getMyCurrentPlaybackState()
      console.log(response)
      if (response.statusCode == 200) {
        //
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default actions