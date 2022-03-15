import { PlaylistTrack } from "../../utils/playlists"
import { hideSongName } from "../../utils/quiz"

interface QuizSongProps {
  song: PlaylistTrack
}

const QuizSong: React.FC<QuizSongProps> = ({ song }) => {
  return (
    <>
      <h1>{hideSongName(song.name)}</h1>
      <h4>{song.artists}</h4>
      <audio src={song.preview_url} controls></audio>
    </>
  )
}

export default QuizSong