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
import { ReactElement } from "react";
import GameSettings from '../settings/GameSettings.ts';
import BoardDimensions from '../settings/BoardDimensions.ts';
import BoardColors from '../settings/BoardColors.ts';
import FruitValues from '../settings/FruitValues.ts';
import SnakeValues from '../settings/SnakeValues.ts';


function SnakeGameMode1Screen(): ReactElement {

	return (
		<div>
			<HomeMenuButton className={"snake-common-button snake-home-button"} />
			<SnakeHomeButton className={"snake-common-button snake-menu-button"}/>
			<SnakeGame gameSettings={new GameSettings()} link={"/Snake/Mode1"}/>

		</div>
	);
}
function SnakeGameMode2Screen(): ReactElement {

	const board:BoardDimensions =	new BoardDimensions(18, 20)

	return (
		<div>
			<HomeMenuButton className={"snake-common-button snake-home-button"} />
			<SnakeHomeButton className={"snake-common-button snake-menu-button"}/>
			<SnakeGame gameSettings={new GameSettings(board)} link={"/Snake/Mode2"}/>

		</div>
	);
}

function SnakeGameMode3Screen(): ReactElement {

	return (
		<div>
			<HomeMenuButton className={"snake-common-button snake-home-button"} />
			<SnakeHomeButton className={"snake-common-button snake-menu-button"}/>
			<SnakeGame gameSettings={new GameSettings(
				new BoardDimensions(9, 10),
				new BoardColors("snake-LightSquare", "snake-DarkSquare"),
				new FruitValues(1),
				new SnakeValues(75)
			)}
			link={"/Snake/Mode3"}
			 />

		</div>
	);
}

function SnakeGameMode4Screen(): ReactElement {

	const board:BoardDimensions =	new BoardDimensions(5,5)

	return (
		<div>
			<HomeMenuButton className={"snake-common-button snake-home-button"} />
			<SnakeHomeButton className={"snake-common-button snake-menu-button"}/>
			<SnakeGame gameSettings={new GameSettings(board)} link={"/Snake/Mode4"}/>

		</div>
	);
}

export {SnakeGameMode1Screen,SnakeGameMode2Screen,SnakeGameMode3Screen, SnakeGameMode4Screen};