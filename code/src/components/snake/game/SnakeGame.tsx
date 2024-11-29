/**
 * Styles
 */
import '../../../styles/snake/GameScreen.css'

/**
 * Components
 */
import Board from "../game/board/Board.tsx";
import Fruit from "../game/fruits/Fruit.tsx";

/**
 * Modules
 */
import { useState, useEffect, useRef, ReactElement } from "react";
import Directions from "../../common/constants/Directions";
import FruitPositionGenerator from "../game/fruits/FruitPositionGenerator.ts";

/**
 * Classes
 */
import InputHandler from "../../common/utils/InputHandler";
import Position from "../game/board/Position.ts";
import Snake from "../game/snake/Snake.tsx";
import Timer from "../../common/Timer";
import SnakeHomeButton from '../SnakeHomeButton.tsx';
import { Link } from 'react-router-dom';


function SnakeGame({ gameSettings }): ReactElement {

	const [inputDirection, setInputDirection] = useState(Directions.DOWN);
	const [boardContents, setBoardContents] = useState(new Map<string, ReactElement | null>());
	const [score, setScore] = useState(0);
	const [startTime,] = useState(new Date().getTime());
    const [isModalVisible, setModalVisible] = useState(false);

	const boardContentsRef = useRef(boardContents);
	const inputDirectionRef = useRef(inputDirection);
	const scoreRef = useRef(score);

	useEffect(() => {

		boardContentsRef.current = boardContents;
		inputDirectionRef.current = inputDirection;
		scoreRef.current = score;

	});

	// Create the snake
	const snake = new Snake(new Position(0, 0).toString());

	// Scores a point
	const scorePoint = () => {
		setScore(scoreRef.current + 1);
	}

	// Change the snake direction
	const changeDirection = (newDirection) => {

		switch (newDirection) {
			case Directions.DOWN:

				if (inputDirectionRef.current !== Directions.UP) setInputDirection(newDirection);

				break;

			case Directions.UP:

				if (inputDirectionRef.current !== Directions.DOWN) setInputDirection(newDirection);

				break;

			case Directions.LEFT:

				if (inputDirectionRef.current !== Directions.RIGHT) setInputDirection(newDirection);

				break;

			case Directions.RIGHT:

				if (inputDirectionRef.current !== Directions.LEFT) setInputDirection(newDirection);

				break;
		}
	}

	// Generate the board contents map
	const generateBoardContents = () => {

		const newBoardContents: Map<string, ReactElement> = new Map<string, ReactElement>();

		for (let j: number = 0; j < gameSettings.boardDimensions.height; j++) {

			for (let i: number = 0; i < gameSettings.boardDimensions.width; i++) {

				newBoardContents.set(new Position(i, j).toString(), null);

			}

		}

		return newBoardContents;

	}

	// Sets a fruit in the given position
	const setFruit = (boardContents: Map<string, ReactElement | null>) => {
		boardContents.set(FruitPositionGenerator(boardContents), <Fruit />);
	}

	// Start game sequence
	const startGame = () => {

		// Link keystrokes to controls
		document.onkeydown = (new InputHandler(changeDirection)).onKeyDown;

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
			scorePoint();
		}

		snake.moveSnake(inputDirectionRef.current);

		if (snake.collided) {
			setModalVisible(true)
		}

		snake.placeSnake(tickBoardContents);

		setBoardContents(tickBoardContents);

	}

	// Start game on component load
	useEffect(() => {

		startGame();

		const ticker = setInterval(() => {
			gameTick();
		}, gameSettings.snakeValues.snakeSpeed);

		return () => clearInterval(ticker);

	}, []);

	return (
		<div className={"snake-game-board"}>
			<div className={"snake-game-display"}>
				<div className={"snake-game-summary"}>
					<label className={"snake-score-display"}>Score: {scoreRef.current}</label>
					<Timer className={"snake-time-display"} startDate={startTime} />
				</div>
				<Board
					boardContents={boardContents}
					boardDimensions={gameSettings.boardDimensions}
					boardColors={gameSettings.boardColors}
				/>
			</div>
			{isModalVisible && (
                <dialog className="modal-overlay">
                    <div className="modal">
                        <h2>Game Over</h2>
                        <p>Time Lasted: {} seconds</p>
                        <p>Score: {score}</p>
                        <div className="modal-buttons">
                            <button onClick={startGame}>Reset Game</button>
                            <Link to="/">
                                <button>Back to Menu</button>
                            </Link>
                        </div>
                    </div>
                </dialog>
            )}
		</div>
	);
}

export default SnakeGame;