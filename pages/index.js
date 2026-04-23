
import { useEffect, useState } from "react"

export default function Home() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
  }, [])

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>⚽ PalpiteStates</h1>
      <h2>Melhores Entradas do Dia</h2>

      {games.map((game, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 15,
            borderRadius: 10
          }}
        >
          <h3>
            {game.home} vs {game.away}
          </h3>
          <p>Probabilidade: {game.probability}%</p>
          <p>
            <strong>{game.recommendation}</strong>
          </p>
        </div>
      ))}
    </div>
  )
}
