/**
 * Styles
 */


/**
 * Components
 */
import Board from "./board/Board.tsx";
import HomeMenuButton from "../../common/HomeMenuButton";
import SnakeHomeButton from "../SnakeHomeButton.tsx";

/**
 * Modules
 */
import {useState, useEffect, ReactElement} from "react";
import Directions from "../../common/constants/Directions";

/**
 * Classes
 */
import InputHandler from "../../common/utils/InputHandler";


function SnakeGameScreen({screenChanger, gameSettings}): ReactElement {

    const [inputDirection, setInputDirection] = useState(Directions.NONE);
    const [boardContents, setBoardContents] = useState({});

    // Start game sequence
    const startGame = (): void => {
        document.onkeydown = new InputHandler(setInputDirection).onKeyDown;
        console.log(gameSettings)
    };

    useEffect(startGame, []);


    return (
        <div>
            <HomeMenuButton screenChanger={screenChanger}/>
            <SnakeHomeButton screenChanger={screenChanger}/>
            <Board boardContents={boardContents} boardDimensions={gameSettings.boardDimensions}/>
        </div>
    );
}

export default SnakeGameScreen;