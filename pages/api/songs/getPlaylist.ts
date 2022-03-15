import type { NextApiRequest, NextApiResponse } from 'next'
import SpotifyWebApi from 'spotify-web-api-node'
import { getAllPlaylistTracks, Playlist } from '../../../utils/playlists'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    redirectUri: "http://localhost:3000/login"
  })

  const refresh = req.query.refresh
  if(Array.isArray(refresh)) { return }

  const id = req.query.id
  if(Array.isArray(id)) { return }

  api.setRefreshToken(refresh)
  api.setAccessToken((await api.refreshAccessToken()).body.access_token)

  const { name, owner, uri } = (await api.getPlaylist(id)).body
  const { display_name } = owner

  const tracks = await getAllPlaylistTracks(api, id)

  if(!tracks) res.status(500)

  const playlist: Playlist = {
    id, 
    name, 
    owner: display_name,
    uri,
    tracks
  }

  res.status(200).json(playlist)
}
