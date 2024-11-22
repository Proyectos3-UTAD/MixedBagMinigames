/**
 * Styles
 */
import '../../styles/snake/Menu.css';

/**
 * Components
 */
import HomeMenuButton from "../common/HomeMenuButton";

/**
 * Modules
 */
import { useState, ReactElement } from "react";
import { Link } from "react-router-dom";

/**
 * Classes
 */
import GameSettings from "./settings/GameSettings.ts";

/**
 * Home screen of the snake minigame.
 * @param screenChanger The state setter to change the screen contents.
 * @returns {JSX.Element} The main menu of the snake mini game
 * @constructor
 */
function SnakeHomeScreen(): ReactElement {

	const [gameSettings,] = useState(new GameSettings());


	return (
		<div className="snake-menu">

			<h1 className="snake-menu-title">Snake</h1>

			<div className="snake-menu-options">
				<Link to={'/Snake/Game'} className="snake-menu-option">
					<p>Play</p>
				</Link>
				<p className="snake-menu-option">Settings</p>
				<p className="snake-menu-option">Scores</p>
				<HomeMenuButton classname="snake-menu-option snake-menu-home-option" />

			</div>

		</div>
	);
}

export default SnakeHomeScreen;