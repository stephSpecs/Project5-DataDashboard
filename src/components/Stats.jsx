import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
const API_KEY = import.meta.env.VITE_RAWG_KEY
import './components.css'

function Stats() {
    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&ordering=-rating&metacritic=1,100`)
            const data  = await response.json()
            setGames(data.results)
        }
        fetchGames()
    }, [])


    const genreCounts = {}

    games.forEach((game) => {
        game.genres.forEach((genre) => {
            if (genreCounts[genre.name]) {
                genreCounts[genre.name] += 1
            } else {
                genreCounts[genre.name] = 1
            }
        })
    })

    const genreDistribution = Object.keys(genreCounts).map((genre) => {
        return { name: genre, count: genreCounts[genre] }
    })


    const genreRating = {}

    games.forEach((game) => {
        game.genres.forEach((genre) => {
            if (genreRating[genre.name]) {
                genreRating[genre.name].totalRating += game.rating
                genreRating[genre.name].count ++
            } else {
                genreRating[genre.name] = { totalRating: game.rating, count: 1}
            }
        })
    })

    const avgRatingByGenre = Object.keys(genreRating).map((genre) => {
        return { name: genre, rating: (genreRating[genre].totalRating / genreRating[genre].count).toFixed(2) }
    })


    const platformCounts = {}

    games.forEach((game) => {
        game.platforms.forEach((platform) => {
            if (platformCounts[platform.platform.name]) {
                platformCounts[platform.platform.name] += 1
            } else {
                platformCounts[platform.platform.name] = 1
            }
        })
    })

    const platformDistribution = Object.keys(platformCounts).map((platform) => {
        return { name: platform, count: platformCounts[platform] }
    })

    return (
        <div>
            <div className="title-container">
                <h1>Statistics</h1>
            </div>

            <div className="stats-container">
                <h3>Genre Distribution</h3>
                <BarChart width={600} height={300} data={genreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>

                <h3>Genre Ratings</h3>
                <BarChart width={600} height={300} data={avgRatingByGenre}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[3, 5]} />
                    <Tooltip />
                    <Bar dataKey="rating" fill="#6449a3" />
                </BarChart>

                <h3>Platform Distribution</h3>
                <BarChart width={600} height={300} data={platformDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#7143dd" />
                </BarChart>
            </div>
            

        </div>
    )
}

export default Stats