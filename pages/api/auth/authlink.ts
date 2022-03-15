import type { NextApiRequest, NextApiResponse } from 'next'
import SpotifyWebApi from 'spotify-web-api-node'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Remove later, purely for benchmarking performance
  const startTime = Date.now()

  const link = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    redirectUri: "http://localhost:3000/login"
  }).createAuthorizeURL([
    'user-read-private', 
    'user-library-read', 
    'user-top-read',
    'playlist-read-private'], '')

  console.log(startTime, Date.now())  

  res.status(200).json({ link })
}
