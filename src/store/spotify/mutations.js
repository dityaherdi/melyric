import * as type from './types'

const mutations = {
  [type.SPOTIFY_USER_LOGIN](state, payload) {
    state.spotifyUser = payload
  }
}

export default mutations