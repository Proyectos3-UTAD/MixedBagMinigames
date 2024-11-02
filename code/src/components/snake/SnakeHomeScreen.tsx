/**
 * Styles
 */

/**
 * Components
 */
import SnakeGameScreen from "./game/SnakeGameScreen.tsx";
import HomeMenuButton from "../common/HomeMenuButton";

/**
 * Modules
 */
import {useState, ReactElement} from "react";

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
function SnakeHomeScreen({screenChanger}): ReactElement {

    const [gameSettings, ] = useState(new GameSettings());

    const startGame = (): void => {
        screenChanger(<SnakeGameScreen screenChanger={screenChanger} gameSettings={gameSettings}/>)
    }


    return (
        <div>
            <h1>Snake</h1>
            <button
                onClick={startGame}>Play
            </button>
            <HomeMenuButton screenChanger={screenChanger}/>
            <p>Mode</p>
            <p>Scores</p>
        </div>
    );
}

export default SnakeHomeScreen;