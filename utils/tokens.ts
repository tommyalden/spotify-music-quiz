import { NextRouter } from "next/router"

export function getRefreshToken(router: NextRouter): string | void {
  const refresh = localStorage.getItem('refresh')
  if(!refresh) router.push('https://accounts.spotify.com/authorize?client_id=4e146ac447a94fda89d36a45128814cc&response_type=code&redirect_uri=http://localhost:3000/login&scope=user-read-private%20user-library-read%20user-top-read%20playlist-read-private&state=')
  else return refresh
} 