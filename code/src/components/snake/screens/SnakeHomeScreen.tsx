/**
 * Styles
 */
import '../../../styles/snake/Menu.css';

/**
 * Components
 */
import HomeMenuButton from "../../common/HomeMenuButton";

/**
 * Modules
 */
import { useState,useEffect, useRef, ReactElement } from "react";
import { Link } from "react-router-dom";

/**
 * Classes
 */
import GameSettings from "../settings/GameSettings.ts";
import BoardDimensions from '../settings/BoardDimensions.ts';


function SnakeGameSettings({ setSettingsOpen, setGameSettings }): ReactElement {
	
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
	  if (dialogRef.current) {
		dialogRef.current.showModal();
	  }
	}, [setSettingsOpen]);

	return (
		<dialog className={"snake-settings-dialog"} >
			<p>Hola!</p>
		</dialog>
	)
}

/**
 * Home screen of the snake minigame.
 * @param screenChanger The state setter to change the screen contents.
 * @returns {JSX.Element} The main menu of the snake mini game
 * @constructor
 */
function SnakeHomeScreen(): ReactElement {

	const [gameSettings, setGameSettings] = useState(new GameSettings(new BoardDimensions(20, 20)));
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [settingsEditor,] = useState(<SnakeGameSettings setSettingsOpen={setSettingsOpen} setGameSettings={setGameSettings}/>)


	return (
		<div className="snake-menu">

			<h1 className="snake-menu-title">Snake</h1>

			<div className="snake-menu-options">

				<Link
					to={"/Snake/Mode1"}
					state={{ gameSettings }}
					className="snake-menu-option"
				>
					<p>Clasico</p>
					
				</Link>

				<Link to={'/Snake/Mode2'} className="snake-menu-option">
					<p>Gran tablero</p>
				</Link>

				<Link to={'/Snake/Mode3'} className="snake-menu-option">
					<p>Velocidad</p>
				</Link>

				<HomeMenuButton className="snake-menu-option snake-menu-home-option" />

			</div>

			{
				settingsOpen ? settingsEditor : null
			}

		</div>
	);
}

export default SnakeHomeScreen;