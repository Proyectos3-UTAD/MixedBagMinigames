import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./menu/Menu";
import SnakeHomeScreen from "./snake/screens/SnakeHomeScreen";
import { SnakeGameMode1Screen, SnakeGameMode2Screen, SnakeGameMode3Screen, SnakeGameMode4Screen } from "./snake/screens/SnakeGameScreen";
import BuscaMinas from "./buscaMinas/buscaMinas";
import SpaceInvaders from "./spaceInvaders/space-invader";
import Pong from "./pong/Pong";
import AtariBreakout from "./atariBreakOut/AtariBreakout";
import PacManGame from "./pacMan/src/PacManGame"; // Importamos el nuevo componente PacManGame
import SpaceInvadersMenu from "./spaceInvaders/SpaceInvadersMenu";
import ClassicSpaceInvaders from "./spaceInvaders/classic-space-invader";
import SpaceInvadersHorde from "./spaceInvaders/spaceInvadersHorde";

import '../styles/App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Menu />} />

					<Route path="/Snake" element={<SnakeHomeScreen />} />
					<Route path="/Snake/Mode1" element={<SnakeGameMode1Screen />} />
					<Route path="/Snake/Mode2" element={<SnakeGameMode2Screen />} />
					<Route path="/Snake/Mode3" element={<SnakeGameMode3Screen />} />
					<Route path="/Snake/Mode4" element={<SnakeGameMode4Screen />} />

					<Route path="/Pacman" element={<PacManGame />} /> {/* Nueva integración */}

					<Route path="/MineSweeper" element={<BuscaMinas />} />
					
					<Route path="/Pong" element={<Pong />} />
                    <Route path="/SpaceInvadersMenu" element={<SpaceInvadersMenu />} />
                    <Route path="/ClassicSpaceInvaders" element={<ClassicSpaceInvaders />} />
                    <Route path="/SpaceInvaders" element={<SpaceInvaders />} />
                    <Route path="/SpaceInvadersHorde" element={<SpaceInvadersHorde />} />

					<Route path="/AtariBreakout" element={<AtariBreakout />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;