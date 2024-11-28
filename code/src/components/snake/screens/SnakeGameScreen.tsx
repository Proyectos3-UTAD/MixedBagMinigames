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
import GameSettings from '../settings/GameSettings.ts';


function SnakeGameScreen(): ReactElement {

	// const [input,] = useState(useLocation().state || null);

	// console.log("input game screen", typeof (input.gameSettings as GameSettings))

	return (
		<div>
			<HomeMenuButton classname={""} />
			<SnakeHomeButton className={""}/>

			{/* {
				input ?
					<SnakeGame gameSettings={(input.gameSettings as GameSettings)} />
					: <SnakeGame gameSettings={new GameSettings()} />

			} */}

			<SnakeGame gameSettings={new GameSettings()} />

		</div>
	);
}

export default SnakeGameScreen;