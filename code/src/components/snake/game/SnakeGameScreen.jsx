import {useState, useEffect} from "react";

import Board from "./board/Board";
import HomeMenuButton from "../../common/HomeMenuButton";
import SnakeHomeButton from "../SnakeHomeButton";
import InputHandler from "../../common/utils/InputHandler";

import Directions from "../../common/constants/Directions";

function SnakeGameScreen({screenChanger, gameOptions}) {

    const [inputDirection, setInputDirection] = useState(Directions.NONE);

    const directionChanger = (newDirection) => {
        console.log(newDirection);
        setInputDirection(newDirection);
    }

    return (
        <div>
            <InputHandler directionChanger={directionChanger}/>
            <HomeMenuButton screenChanger={screenChanger}/>
            <SnakeHomeButton screenChanger={screenChanger}/>
            <Board boardWidth={gameOptions.board.width} boardHeight={gameOptions.board.height}/>
        </div>
    );
}

export default SnakeGameScreen;