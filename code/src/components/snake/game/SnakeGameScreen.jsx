import {useState, useEffect} from "react";

import Board from "./board/Board";
import HomeMenuButton from "../../common/HomeMenuButton";
import SnakeHomeButton from "../SnakeHomeButton";
import InputHandler from "../../common/utils/InputHandler";

import Directions from "../../common/constants/Directions";
import Fruit from "./fruits/Fruit";
import FruitPositionGenerator from "./fruits/FruitPositionGenerator";
import Position from "./board/Position";

function SnakeGameScreen({screenChanger, gameOptions}) {

    const [inputDirection, setInputDirection] = useState(Directions.NONE);
    const [boardContents, setBoardContents] = useState({});
    const [fruitCurrentPos, setFruitCurrentPos] = useState(FruitPositionGenerator(boardContents, gameOptions.boardDimensions));

    const directionChanger = (newDirection) => {
        if (newDirection !== null) {
            setInputDirection(Directions.NONE);
            setInputDirection(newDirection);
        }
    }

    const changeBoardContents = (position, newContent) => {
        setBoardContents((prevContents) => ({
            ...prevContents,
            [position]: newContent,
        }));
    }

    const changeCurrentFruitPosition = (position) => {
        setFruitCurrentPos(position);
    }

    const tick = () => {

        console.log(inputDirection)

        changeBoardContents(fruitCurrentPos, undefined);
        changeCurrentFruitPosition(Position.getNextPositionStringNotationFromString(fruitCurrentPos, inputDirection));
        changeBoardContents(fruitCurrentPos, <Fruit/>)

        console.log(fruitCurrentPos)
    }

    useEffect(() => {

        const interval = setInterval(tick, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div>

            <HomeMenuButton screenChanger={screenChanger}/>
            <SnakeHomeButton screenChanger={screenChanger}/>
            <InputHandler
                directionChanger={directionChanger}
                content={
                    <Board boardContents={boardContents} boardDimensions={gameOptions.boardDimensions}/>
                }
            />
        </div>
    );
}

export default SnakeGameScreen;