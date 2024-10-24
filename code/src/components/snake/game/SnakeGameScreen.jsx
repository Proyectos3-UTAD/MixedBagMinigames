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
        if (position !== "undefined-undefined")
            setFruitCurrentPos(position);
        else
            setFruitCurrentPos(Position.getStringNotation(0, 0));
    }

    useEffect(() => {

        console.log("Newdir", inputDirection);
        changeBoardContents(fruitCurrentPos, undefined);
        console.log("Currpos", fruitCurrentPos)
        const nextPos = Position.getNextPositionStringNotationFromString(fruitCurrentPos, inputDirection);
        console.log("Nextpos", nextPos)
        changeCurrentFruitPosition(nextPos);
        changeBoardContents(fruitCurrentPos, <Fruit/>)

    }, [inputDirection]);

    useEffect(() => {

        console.log("Fruit pos", fruitCurrentPos);

    }, [fruitCurrentPos]);

    // useEffect(() => {
    //
    //     setInterval(() => {
    //

    //
    //         // console.log(boardContents);
    //         console.log("fruitpos", fruitCurrentPos);
    //         console.log("inputDirection", inputDirection);
    //
    //     }, 5000);
    //
    // }, []);

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