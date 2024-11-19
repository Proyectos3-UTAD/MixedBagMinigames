import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./menu/Menu";
import SnakeHomeScreen from "./snake/SnakeHomeScreen";
import PacMan from "./pacMan/pacMan";
import BuscaMinas from "./buscaMinas/buscaMinas";
import SpaceInvaders from "./spaceInvaders/space-invader";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Menu/>}/>
                    <Route path="Snake" element={<SnakeHomeScreen/>}/>
                    <Route path="Pacman" element={<PacMan/>}/>
                    <Route path="MineSweeper" element={<BuscaMinas/>}/>ç
                    <Route path="SpaceInvaders" element={<SpaceInvaders/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;