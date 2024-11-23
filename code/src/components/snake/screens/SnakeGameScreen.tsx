/**
 * Styles
 */
import '../../../styles/snake/GameScreen.css'

/**
 * Components
 */
import HomeMenuButton from "../../common/HomeMenuButton";
import SnakeHomeButton from "../SnakeHomeButton.tsx";
import SnakeGame from '../game/SnakeGame.tsx';


/**
 * Modules
 */
import { ReactElement, useState } from "react";
import { useLocation } from 'react-router-dom';
import GameSettings from '../settings/GameSettings.ts';


function SnakeGameScreen(): ReactElement {

	const [input,] = useState(useLocation().state || null);

	console.log(input.className)
	return (
		<div>
			<HomeMenuButton classname={""} />

			{
				input instanceof GameSettings ?
					<SnakeGame gameSettings={input} />
					: <SnakeGame gameSettings={new GameSettings()}/> 
			}

			<SnakeHomeButton />
		</div>
	);
}

export default SnakeGameScreen;