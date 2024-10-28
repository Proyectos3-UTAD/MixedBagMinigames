/**
 * Styles
 */


/**
 * Components
 */
import Board from "./board/Board.tsx";
import HomeMenuButton from "../../common/HomeMenuButton";
import SnakeHomeButton from "../SnakeHomeButton.tsx";
import Fruit from "./fruits/Fruit.tsx";
import SnakeHomeScreen from "../SnakeHomeScreen.tsx";


/**
 * Modules
 */
import {useState, useEffect, useRef, ReactElement} from "react";
import Directions from "../../common/constants/Directions";
import FruitPositionGenerator from "./fruits/FruitPositionGenerator.ts";

/**
 * Classes
 */
import InputHandler from "../../common/utils/InputHandler";
import Position from "./board/Position.ts";
import Snake from "./snake/Snake.tsx";


function SnakeGameScreen({screenChanger, gameSettings}): ReactElement {

    const [inputDirection, setInputDirection] = useState(Directions.DOWN);
    const [boardContents, setBoardContents] = useState(new Map<string, ReactElement | null>);

    const boardContentsRef = useRef(boardContents);
    const inputDirectionRef = useRef(inputDirection);

    useEffect(() => {

        boardContentsRef.current = boardContents;
        inputDirectionRef.current = inputDirection;

    });

    const snake = new Snake(new Position(0, 0).toString());

    // Update the board contents
    const updateBoardContents = (key: string, content: ReactElement): void => {

        const newBoardContents: Map<string, ReactElement> = new Map<string, ReactElement>(boardContents);

        newBoardContents.set(
            key,
            content
        );

        setBoardContents(newBoardContents);

    }

    // Generate the board contents map
    const generateBoardContents = () => {

        const newBoardContents: Map<string, ReactElement> = new Map<string, ReactElement>;

        for (let j: number = 0; j < gameSettings.boardDimensions.height; j++) {

            for (let i: number = 0; i < gameSettings.boardDimensions.width; i++) {

                newBoardContents.set(new Position(i, j).toString(), null);

            }

        }

        return newBoardContents;

    }

    // Sets a fruit in the given position
    const setFruit = (boardContents: Map<string, ReactElement | null>) => {
        boardContents.set(FruitPositionGenerator(boardContents), <Fruit/>);
    }

    // Start game sequence
    const startGame = () => {

        // Link keystrokes to controls
        document.onkeydown = (new InputHandler(setInputDirection)).onKeyDown;

        // Generate initial contents
        const initialBoardContents: Map<string, ReactElement | null> = generateBoardContents();

        snake.placeSnake(initialBoardContents);

        // Add N fruit to initial contents
        for (let initialFruits: number = 0; initialFruits < gameSettings.fruitValues.fruitAmount; initialFruits++) {
            setFruit(initialBoardContents);
        }

        // Set the initial board contents
        setBoardContents(initialBoardContents);

    };

    // Normal game actions
    const gameTick = () => {

        const tickBoardContents: Map<string, ReactElement | null> = new Map<string, ReactElement | null>(boardContentsRef.current);

        if (snake.growthLeft > 0) {
            setFruit(tickBoardContents);
        }

        snake.moveSnake(inputDirectionRef.current);

        if (snake.collided) {
            screenChanger(<SnakeHomeScreen screenChanger={screenChanger}/>);
        }

        snake.placeSnake(tickBoardContents);

        setBoardContents(tickBoardContents);

    }

    useEffect(() => {

        startGame();

        const ticker = setInterval(() => {
            gameTick();
        }, gameSettings.snakeValues.snakeSpeed);

        return () => clearInterval(ticker);

    }, []);

    // useEffect(() => {
    //
    //     console.log("Effect", boardContents);
    //
    // }, [boardContents]);


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