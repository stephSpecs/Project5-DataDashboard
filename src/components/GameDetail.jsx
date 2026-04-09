import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router'
import './components.css'
const API_KEY = import.meta.env.VITE_RAWG_KEY

function GameDetail() {
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchGameData = async () => {
            const response = await fetch (`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const data = await response.json();
            setGameData(data);
            setLoading(false);
        }
        fetchGameData();
    }, [id]);
    if (loading === true) {
        return <p>Loading...</p>
    }
    console.log(gameData)

    return (
        <div>
            <div className="title-container">
                <h1>Game Detail</h1>
            </div>

            <div className="game-info-container">
                <p>Name: {gameData.name}</p>
                <p>Released: {gameData.released}</p>
                <p>Age Rating: {gameData.esrb_rating ? gameData.esrb_rating.name : "No Rating"}</p>
                <p>Developers: {gameData.developers.map((developer) => developer.name).join(", ")}</p>
                <p>Publishers: {gameData.publishers.map((publisher) => publisher.name).join(", ")}</p>
                <p>Description: {gameData.description_raw}</p>  
            </div>

        </div>
    )
}

export default GameDetail