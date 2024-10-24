import {useState, useEffect} from "react";

import Board from "./board/Board";
import HomeMenuButton from "../../common/HomeMenuButton";
import SnakeHomeButton from "../SnakeHomeButton";
import InputHandler from "../../common/utils/InputHandler";

import Directions from "../../common/constants/Directions";
import Fruit from "./fruits/Fruit";

function SnakeGameScreen({screenChanger, gameOptions}) {

    const [inputDirection, setInputDirection] = useState(Directions.NONE);
    const [boardContents, setBoardContents] = useState({
        "0-0": <Fruit/>
    });


    const directionChanger = (newDirection) => {
        setInputDirection(newDirection);
    }

    return (
        <div>

            <InputHandler directionChanger={directionChanger}/>
            <HomeMenuButton screenChanger={screenChanger}/>
            <SnakeHomeButton screenChanger={screenChanger}/>

            <Board boardContents={boardContents} boardDimensions={gameOptions.boardDimensions}/>
        </div>
    );
}

export default SnakeGameScreen;