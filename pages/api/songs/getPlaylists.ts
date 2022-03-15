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

  api.setRefreshToken(refresh)
  api.setAccessToken((await api.refreshAccessToken()).body.access_token)

  const user =(await api.getMe()).body

  const playlistIds = ((await api.getUserPlaylists()).body.items).filter(playlist => {
    return playlist.owner.id == user.id
  }).map(playlist => playlist.id)

  // const playlists = playlistIds.map((id) => {
  //   api.getPlaylist(id).then(data => {
  //     const { name, owner, uri } = data.body
  //     const { display_name } = owner

  //     const playlist: Playlist = {
  //       id,
  //       name,
  //       owner: display_name,
  //       uri
  //     }

  //     return playlist
  //   })
  // })

  const playlists = await Promise.all(playlistIds.map(async (id) => {
    const { name, owner, uri } = (await api.getPlaylist(id)).body
    const { display_name } = owner

    const playlist: Playlist = {
      id, 
      name, 
      owner: display_name,
      uri
    }

    return playlist
  }))

  res.status(200).json(playlists)
}
