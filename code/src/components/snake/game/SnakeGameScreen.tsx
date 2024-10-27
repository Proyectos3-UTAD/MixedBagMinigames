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
import Position from "./board/Position.ts";


function SnakeGameScreen({screenChanger, gameSettings}): ReactElement {

    const [inputDirection, setInputDirection] = useState(Directions.NONE);
    const [boardContents, setBoardContents] = useState(new Map<string, ReactElement>);

    // Generate the board contents map
    const generateBoardContentsMap = () => {

        const newBoardContents: Map<string, ReactElement> = new Map<string, ReactElement>;

        for (let j: number = 0; j < gameSettings.boardDimensions.height; j++) {

            for (let i: number = 0; i < gameSettings.boardDimensions.width; i++) {

                newBoardContents.set(new Position(i, j).toString(), null);

            }

        }

        setBoardContents(newBoardContents);

    }

    // Start game sequence
    const startGame = (): void => {

        document.onkeydown = new InputHandler(setInputDirection).onKeyDown;
        generateBoardContentsMap();
        
    };

    useEffect(startGame, []);
    useEffect(() => console.log(boardContents), [boardContents]);


    return (
        <div>
            <HomeMenuButton screenChanger={screenChanger}/>
            <SnakeHomeButton screenChanger={screenChanger}/>
            <Board boardContents={boardContents} boardDimensions={gameSettings.boardDimensions}
                   boardColors={gameSettings.boardColors}/>
        </div>
    );
}

export default SnakeGameScreen;