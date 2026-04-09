import { Link, useLocation } from 'react-router' 
import './components.css'

function NavBar() {
    const location = useLocation()

    return (
        <div className="nav-container">
            <div className="nav-buttons">
                {location.pathname !== "/" && <Link to="/"><button>Back To Dashboard</button></Link>}
                <Link to="/top-ten"><button>Top 10 Games</button></Link>  
                <Link to="/stats"><button>Statistics</button></Link>  
            </div>

            <footer>Created by stephSpecs</footer>      
        </div>
         
    )
}

export default NavBar