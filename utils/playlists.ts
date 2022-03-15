import arrayShuffle from "array-shuffle";
import SpotifyWebApi from "spotify-web-api-node";

export type PlaylistTrack = {
  id: string
  artists: string[]
  name: string
  preview_url: string
}

export type Playlist = {
  id: string
  name: string
  owner: string | undefined
  uri: string,
  tracks: PlaylistTrack[]
}

export async function getAllPlaylistTracks(api: SpotifyWebApi, id: string): Promise<PlaylistTrack[]> {
  const total = (await api.getPlaylist(id)).body.tracks.total
  let tracks = (await api.getPlaylistTracks(id)).body.items;

  for(let i = 1; i < ((Math.floor(total / 100)) + 1); i++) {
      tracks = tracks.concat((await api.getPlaylistTracks(id, { offset: i * 100 })).body.items)
  }
  
  const trimmedTracks = tracks.map(({ track: trackData }) => {
    const artists = trackData.artists.map(artist => artist.name)
    if(!trackData.preview_url) trackData.preview_url = ""

    const track: PlaylistTrack = {
      id: trackData.id,
      artists,
      name: trackData.name,
      preview_url: trackData.preview_url
    }

    return track
  }).filter(track => track.preview_url != "")

  const shuffled = arrayShuffle(trimmedTracks)

  if(shuffled.length < 35) return shuffled
  return shuffled.slice(0, 15);
}
