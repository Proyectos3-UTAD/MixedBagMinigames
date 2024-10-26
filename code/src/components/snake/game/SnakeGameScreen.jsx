import {useState, useEffect} from "react";

import Board from "./board/Board";
import HomeMenuButton from "../../common/HomeMenuButton";
import SnakeHomeButton from "../SnakeHomeButton";
import InputHandler from "../../common/utils/InputHandler";

import Directions from "../../common/constants/Directions";
import Fruit from "./fruits/Fruit";
import FruitPositionGenerator from "./fruits/FruitPositionGenerator";
import Position from "./board/Position";
import Snake from "./snake/Snake";

function SnakeGameScreen({screenChanger, gameOptions}) {

    const [inputDirection, setInputDirection] = useState(Directions.UP);
    const [boardContents, setBoardContents] = useState({});

    // Start game sequence
    const startGame = () => {
        document.onkeydown = new InputHandler(setInputDirection).onKeyDown;
    };

    useEffect(startGame, []);

    useEffect(() => {
        console.log(inputDirection)
    }, [inputDirection]);


    return (
        <div>

            <HomeMenuButton screenChanger={screenChanger}/>
            <SnakeHomeButton screenChanger={screenChanger}/>
            <Board boardContents={boardContents} boardDimensions={gameOptions.boardDimensions}/>
        </div>
    );
}

export default SnakeGameScreen;