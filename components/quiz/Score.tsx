import Link from "next/link"

interface ScoreProps {
  score: number
  total: number
}

const Score: React.FC<ScoreProps> = ({ score, total }) => {
  return (
    <div>
      <h1>{score}/{total}</h1>
      <Link href="/">Back</Link>
    </div>
  )
}

export default Score