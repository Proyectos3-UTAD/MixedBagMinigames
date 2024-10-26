/**
 * Styles
 */
import '../../../../styles/snake/Board.css';

/**
 * Components
 */
import BoardSquare from "./BoardSquare.tsx";
import Position from "./Position.ts";

function getCornerClass(xCoordinate, yCoordinate, boardWidth, boardHeight) {

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

function GenerateSquares(boardContents, boardWith, boardHeight) {

    const squares = [];

    let rowStartsWithLightSquare = true;
    let isLightSquare = true;


    for (let y = 0; y < boardHeight; y++) {

        isLightSquare = rowStartsWithLightSquare

        for (let x = 0; x < boardWith; x++) {

            let cornerClass = getCornerClass(x, y, boardWith, boardHeight);

            squares.push(
                <BoardSquare
                    content={boardContents?.[`${Position.getStringNotation(x, y)}`]}
                    classNames={
                        `snake-board-square ${isLightSquare === true ? 'snake-LightSquare' : 'snake-DarkSquare'} ${cornerClass ? cornerClass : ''}`
                    }
                />
            );

            isLightSquare = !isLightSquare;
        }

        rowStartsWithLightSquare = !rowStartsWithLightSquare;

    }

    return squares;
}

function Board({boardContents, boardDimensions}) {

    const boardSquares = GenerateSquares(boardContents, boardDimensions.width, boardDimensions.height);

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