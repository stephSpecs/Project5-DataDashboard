import { Routes, Route } from 'react-router'
import Dashboard from './components/Dashboard.jsx'
import GameDetail from './components/GameDetail.jsx'
import TopTen from './components/TopTen.jsx'
import Stats from './components/Stats.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <div>

      <NavBar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path='/top-ten' element={<TopTen />} />
        <Route path='/stats' element={<Stats />} />
      </Routes>
      
    </div>
  )
}

export default App
