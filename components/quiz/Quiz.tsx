import { useState } from "react"
import type { PlaylistTrack } from "../../utils/playlists"
import { checkAnswer } from "../../utils/quiz"

import QuizSong from "./QuizSong"

interface QuizProps {
  songs: PlaylistTrack[]
  correctAnswer (): void 
  finishedQuiz (): void
}

const Quiz: React.FC<QuizProps> = ({ songs, correctAnswer, finishedQuiz }) => {
  const [index, setIndex] = useState(0)
  const song = songs[index]

  const [input, setInput] = useState('')

  const nextSong = () => {
    if(checkAnswer(song.name, input)) correctAnswer()
    setInput('')
    if(index + 1 < songs.length) setIndex(index + 1)
    else finishedQuiz()
  }

  return (
    <div>
      <QuizSong song={song}/><br />
      <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={nextSong}>Next</button>
    </div>
  )
}

export default Quiz