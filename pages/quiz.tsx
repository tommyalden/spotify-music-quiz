import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Quiz from "../components/quiz/Quiz";
import Score from "../components/quiz/Score";
import { Playlist } from "../utils/playlists";
import { getRefreshToken } from "../utils/tokens";

const QuizPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [playlist, setPlaylist] = useState<Playlist>()
  const [score, setScore] = useState(0)

  const [scoreScreen, setScoreScreen] = useState(false)

  const loading = !playlist

  useEffect(() => {
    if(router.isReady) {
      const refresh = getRefreshToken(router)
      fetch(`http://localhost:3000/api/songs/getPlaylist?id=${id}&refresh=${refresh}`).then(async (res) => setPlaylist(JSON.parse(await res.text())))
    }
  }, [id])

  const correctAnswer = () => setScore(score + 1)
  const finishedQuiz = () => setScoreScreen(true)

  return (
    <>
      {loading ? (<h1>Loading</h1>) : 
        (scoreScreen ? <Score score={score} total={playlist.tracks.length} /> : <Quiz songs={playlist.tracks} correctAnswer={correctAnswer} finishedQuiz={finishedQuiz}/>) 
      }
    </>
  )
}

export default QuizPage

// import { NextPage } from "next"
// import { useRouter } from "next/router"
// import { useEffect, useState } from "react"
// import { Playlist } from "../utils/playlists"

// // function removeNameFluff(songName: string) {
// //   const words = (songName.split(/[(-.]/g))[0]

// //   return words
// //   // let words = name.replace(/[^\w\s]/g, "").split(' (')
// //   // words = words[0]
// //   // words = words.split(' ')

// //   // console.log(words)

// //   // console.log(name.replace(/[^\w\s]/g, ""))
// //   // console.log(name.split(' ('))

// //   // words = words.map(word => {
// //   //   let tag = word.substring(1).replaceAll(/./g, '-')
// //   //   return word[0] + tag
// //   // })

// //   // name = ''

// //   // words.forEach(word => name = name + word + ' ')

// //   // return name
// // }

// // const Quiz: NextPage = () => {
// //     const router = useRouter()
// //     const { id } = router.query
  
// //     const [loading, setLoading] = useState(true)
// //     const [playlist, setPlaylist] = useState<Playlist>()

// //     const [songIndex, setSongIndex] = useState(-1)
// //     const [answer, setAnswer] = useState('')

// //     const [score, setScore] = useState(0)

// //     function nextSong() {
// //       if(playlist && songIndex + 1 < playlist.tracks.length) {
// //         console.log(songIndex + 1)
        
// //         setSongIndex(songIndex + 1)
// //         setAnswer(removeNameFluff(playlist.tracks[songIndex].name).toLowerCase().replaceAll(/[^A-Za-z0-9\s]/g, ''))
// //       } else {
// //         router.push('/')
// //       }
// //     }

// //     useEffect(() => {
// //       if(router.isReady && id) {
// //         const refresh = localStorage.getItem('refresh')
// //         if(!refresh) router.push('https://accounts.spotify.com/authorize?client_id=4e146ac447a94fda89d36a45128814cc&response_type=code&redirect_uri=http://localhost:3000/login&scope=user-read-private%20user-library-read%20user-top-read%20playlist-read-private&state=')

// //         fetch(`http://localhost:3000/api/songs/getPlaylist?id=${id}&refresh=${refresh}`, {
// //           credentials: 'same-origin',
// //           mode: 'same-origin'
// //         }).then(async (data) => {        
// //           setPlaylist(JSON.parse(await data.text()))
// //           setLoading(false)
// //         })
// //       }
// //     }, [id])
  
// //     if(loading) return <h1>Loading...</h1>
// //     if(!playlist) return <h1>Error</h1>
    
// //     return (
// //       <div>
// //         {songIndex == -1 ? <button onClick={nextSong}>Start</button> :
// //           <div>
// //             <h1>{removeNameFluff(playlist.tracks[songIndex].name)}</h1>
// //             <h4>{playlist.tracks[songIndex].name}</h4>
// //             <h4>{answer}</h4>
// //             <audio src={playlist.tracks[songIndex].preview_url} controls></audio>
// //             <button onClick={() => nextSong()}>Next</button>
// //           </div>
// //         }
// //       </div>
// //     )
//   // }
  
//   export default Quiz