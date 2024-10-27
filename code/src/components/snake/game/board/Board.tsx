/**
 * Styles
 */
import '../../../../styles/snake/Board.css';

/**
 * Components
 */
import BoardTile from "./BoardTile.tsx";

/**
 * Modules
 */
import {ReactElement} from "react";

/**
 * Classes
 */
import Position from "./Position.ts";
import BoardColors from "../../settings/BoardColors";
import boardDimensions from "../../settings/BoardDimensions";

/**
 * Checks if any given tile is a corner and what class it should be given.
 * @param xCoordinate The position in the X axis of the tile.
 * @param yCoordinate The position in the Y axis of the tile.
 * @param boardWidth The width of the board.
 * @param boardHeight The height of the board.
 */
function getCornerClass(xCoordinate: number, yCoordinate: number, boardWidth: number, boardHeight: number) {

    if ((yCoordinate === 0) && (xCoordinate === 0)) {
        return "up-left-snake-board-square";
    } else if ((yCoordinate === 0) && (xCoordinate === boardWidth - 1)) {
        return "up-right-snake-board-square";
    } else if ((yCoordinate === boardHeight - 1) && (xCoordinate === 0)) {
        return "down-left-snake-board-square";
    } else if ((yCoordinate === boardHeight - 1) && (xCoordinate === boardWidth - 1)) {
        return "down-right-snake-board-square";
    }
    return null;
}

/**
 * Creates the squares of the board with their given content.
 * @param boardContents The contents of the board.
 * @param boardDimensions The dimensions of the board.
 * @param boardColors The colors of the tiles in the board.
 * @constructor
 */
function GenerateSquares(boardContents: Map<string, ReactElement>, boardDimensions: boardDimensions, boardColors: BoardColors) {

    const squares = [];

    let rowStartsWithLightSquare = true;
    let isLightSquare = true;
    let keyIndex = 0;


    for (let y = 0; y < boardDimensions.height; y++) {

        isLightSquare = rowStartsWithLightSquare

        for (let x = 0; x < boardDimensions.width; x++) {

            let cornerClass = getCornerClass(x, y, boardDimensions.width, boardDimensions.height);

            squares.push(
                <BoardTile
                    key={keyIndex++}
                    content={boardContents.get(new Position(x, y).toString())}
                    classNames={
                        `snake-board-square ${isLightSquare === true ? boardColors.lightSquareClass : boardColors.darkSquareClass} ${cornerClass ? cornerClass : ''}`
                    }
                />
            );

            isLightSquare = !isLightSquare;
        }

        rowStartsWithLightSquare = !rowStartsWithLightSquare;

    }

    return squares;
}

/**
 * Board component in the snake game
 * @param boardContents The contents of the board.
 * @param boardDimensions The dimensions of the board.
 * @param boardColors The colors of the tiles in the board.
 * @constructor
 * @returns An html component with everything in the board.
 */
function Board({boardContents, boardDimensions, boardColors}) {

    const boardSquares = GenerateSquares(boardContents, boardDimensions, boardColors);

    return (
        <div
            className={"snake-Board"}
            style={{
                gridTemplateColumns: `repeat(${boardDimensions.width}, 1fr)`,
                gridTemplateRows: `repeat(${boardDimensions.height}, 1fr)`
            }}
        >
            {boardSquares}
        </div>
    );
}

export default Board;