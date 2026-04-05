import { useState, useEffect } from 'react'
import.meta.env.VITE_RAWG_KEY
import './App.css'

function App() {
  const [games, setGames] = useState([])
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("All")

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&page_size=40&ordering=-rating&metacritic=1,100`)
      const data = await response.json()
      setGames(data.results)
    }
    fetchGames()
  }, [])

  const allGenres = ["All", ...new Set(games.flatMap((game) => game.genres.map((g) => g.name) ))]
  const filteredGames = games
    .filter((game) => game.name.toLowerCase().includes(search.toLowerCase()))
    .filter((game) => {
      if (genre === "All") return true
      return game.genres.some((g) => g.name === genre)
    })
  
  const total = filteredGames.reduce((total, game) => total + game.rating, 0);
  const avgRating = filteredGames.length > 0 ? total / filteredGames.length : 0;
  const topGame = filteredGames.length > 0 ? filteredGames.reduce((best, game) =>
    game.rating > best.rating ? game : best,
  filteredGames[0] ): null

  return (
    <div className="main-container">

      <div className="navbar-container">
        <input type="text" placeholder="Search games..." value={search} onChange={(e) => setSearch(e.target.value)} />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {allGenres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="title-container">
        <h1>Game Vault</h1>
      </div>

      <div className="stats-container">
        <p>Total Games: {filteredGames.length}</p>
        <p>Average Rating: {avgRating.toFixed(2)}</p>
        <p>Top Game: {topGame ? `${topGame.name} (${topGame.rating})` : "-"}</p>
      </div>

      <div className="game-data-container">
        {filteredGames.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.background_image} alt={game.name} />
            <p className="game-name">{game.name}</p>
            <p>{game.platforms.map((p) => p.platform.name).join(", ")}</p>
            <p>Rating: {game.rating}</p>
          </div>
        ))}
      </div>

      <footer>Made by stephSpecs</footer>
    </div>
  )
}

export default App
