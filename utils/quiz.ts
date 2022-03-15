import { compareTwoStrings } from "string-similarity"

export function removeNameJunk(name: string): string {
  return name.split(/[(-.]/g)[0]
}

export function checkAnswer(song: string, answer: string): boolean {
  song = removeNameJunk(song).toLowerCase().replaceAll(/[^a-z0-9]/g, '')
  answer = answer.toLowerCase().replaceAll(/[^a-z0-9]/g, '')

  const similarity = compareTwoStrings(song, answer)
  
  if(similarity > 0.8) return true
  else return false
}

export function hideSongName(song: string): string {
  song = removeNameJunk(song)

  let words = song.split(' ')

  words = words.map(word => {
    let hidden = word.substring(1).replaceAll(/./g, '-')
    return word[0] + hidden
  })

  song = ''
  words.forEach(word => song = song + word + ' ')

  return song
}