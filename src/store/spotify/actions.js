import * as type from './types'
import axios from 'axios'
import spotifyAPI from 'spotify-web-api-node'
const spotify = new spotifyAPI()

const actions = {
  loginSpotify({ commit }, payload) {
    let popupLogin = window.open('http://localhost:3000/api/spotify/login', 'Spotify Login', 'width=800,height=600')
    
    window.spotifyCallback = async (token) => {
      const { access_token, refresh_token } = token

      localStorage.setItem('spotifyUserAccessToken', JSON.stringify(access_token))
      localStorage.setItem('spotifyUserRefreshToken', JSON.stringify(refresh_token))
      spotify.setAccessToken(access_token)
      spotify.setRefreshToken(refresh_token)
      
      try {
        const response = await spotify.getMe()
        if (response.statusCode == 200) {
          const { body } = response
          let user = Object.assign(body, {token: {access_token, refresh_token}})
          commit(type.SPOTIFY_USER_LOGIN, user)
        }
      } catch (error) {
        console.log(error)
      }

      popupLogin.close()
    }
  },
}

export default actions