import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./menu/Menu";
import SnakeHomeScreen from "./snake/SnakeHomeScreen";
import PacMan from "./pacMan/pacMan";
import BuscaMinas from "./buscaMinas/buscaMinas";
import SpaceInvaders from "./spaceInvaders/space-invader";
import Pong from "./pong/Pong";
import AtariBreakout from "./atariBreakOut/AtariBreakout";

import '../styles/App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Menu/>}/>
                    <Route path="/Snake" element={<SnakeHomeScreen/>}/>
                    <Route path="/Pacman" element={<PacMan/>}/>
                    <Route path="/MineSweeper" element={<BuscaMinas/>}/>
                    <Route path="/SpaceInvaders" element={<SpaceInvaders/>}/>
                    <Route path="/Pong" element={<Pong/>}/>
                    <Route path="/AtariBreakout" element={<AtariBreakout/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;