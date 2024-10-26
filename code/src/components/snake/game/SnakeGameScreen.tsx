import {useState, useEffect, ReactElement} from "react";

import Board from "./board/Board";
import HomeMenuButton from "../../common/HomeMenuButton";
import SnakeHomeButton from "../SnakeHomeButton.tsx";
import InputHandler from "../../common/utils/InputHandler";

import Directions from "../../common/constants/Directions";
import Fruit from "./fruits/Fruit";
import FruitPositionGenerator from "./fruits/FruitPositionGenerator";
import Position from "./board/Position";
import Snake from "./snake/Snake";

function SnakeGameScreen({screenChanger, gameOptions}): ReactElement {

    const [inputDirection, setInputDirection] = useState(Directions.NONE);
    const [boardContents, setBoardContents] = useState({});

    // Start game sequence
    const startGame = (): void => {
        document.onkeydown = new InputHandler(setInputDirection).onKeyDown;
    };

    useEffect(startGame, []);


    return (
        <div>

            <HomeMenuButton screenChanger={screenChanger}/>
            <SnakeHomeButton screenChanger={screenChanger}/>
            <Board boardContents={boardContents} boardDimensions={gameOptions.boardDimensions}/>
        </div>
    );
}

export default SnakeGameScreen;