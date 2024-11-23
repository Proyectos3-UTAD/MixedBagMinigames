import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./menu/Menu";
import SnakeHomeScreen from "./snake/screens/SnakeHomeScreen";
import SnakeGameScreen from "./snake/screens/SnakeGameScreen";
import SnakeScoreScreen from "./snake/screens/SnakeScoreScreen";
import PacMan from "./pacMan/pacMan";
import BuscaMinas from "./buscaMinas/buscaMinas";
import SpaceInvaders from "./spaceInvaders/space-invader";
import Pong from "./pong/Pong";
import AtariBreakout from "./atariBreakOut/AtariBreakout";

import '../styles/App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Menu/>}/>
                    <Route path="/Snake" element={<SnakeHomeScreen/>}/>
                    <Route path="/Snake/Game" element={<SnakeGameScreen/>}/>
                    <Route path="/Snake/Scores" element={<SnakeScoreScreen/>}/>
                    <Route path="/Pacman" element={<PacMan/>}/>
                    <Route path="/MineSweeper" element={<BuscaMinas/>}/>ç
                    <Route path="/SpaceInvaders" element={<SpaceInvaders/>}/>
                    <Route path="/Pong" element={<Pong/>}/>
                    <Route path="/AtariBreakout" element={<AtariBreakout/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;