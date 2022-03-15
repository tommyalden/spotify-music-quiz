import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Playlist } from '../utils/playlists'
import Link from 'next/link'
import { getRefreshToken } from '../utils/tokens'

const Home: NextPage = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  useEffect(() => {
    const refresh = getRefreshToken(router)

    fetch(`http://localhost:3000/api/songs/getPlaylists?refresh=${refresh}`)
    .then(async (data) => {
      setPlaylists(await data.json())
      setLoading(false)
    })
  }, [])

  if(loading) return <h1>Loading...</h1>

  return (
    <div>
      {playlists.map(playlist => {
        return (
          <div><Link href={`/quiz?id=${playlist.id}`}>{playlist.name}</Link><br /></div>
        )
      })}
      <Link href='/quiz?id=artists'>Top Artists</Link><br />
      <Link href='/quiz?id=songs'>Top Songs</Link>
    </div>
  )
}

export default Home
