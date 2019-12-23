export function extractSpotifyToken() {
  let token = {}
  let e, r = /([^&;=]+)=?([^&;]*)/g
  let q = window.location.hash.substring(1)
  while ( e = r.exec(q)) {
    token[e[1]] = decodeURIComponent(e[2])
  }
  return token;
} 