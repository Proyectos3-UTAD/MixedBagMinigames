/**
 * Styles
 */
import '../../styles/snake/Board.css';

/**
 * Components
 */
import BoardSquare from "./BoardSquare";


function Board({boardWidth, boardHeight}) {

    const boardSquares = [];

    const isBoardCorner = (i) => {
        return (
            i === 0 ||
            i === boardWidth - 1 ||
            i === boardWidth * (boardHeight - 1) ||
            i === boardWidth * boardHeight - 1
        );
    }

    let lightSquare = true;

    for (let i = 0; i < boardWidth * boardHeight; i++) {
        boardSquares.push(
            <BoardSquare
                boardColor={lightSquare ? "LightSquare" : "DarkSquare"}
                rounded={isBoardCorner(i)}
                ç
            />
        );
        lightSquare = !lightSquare;
    }

    return (
        <canvas
            className={"Board"}
            style={{
                gridTemplateColumns: `repeat(${boardWidth}, 1fr)`,
                gridTemplateRows: `repeat(${boardHeight}, 1fr)`
            }}
        >
            {boardSquares.map((boardSquare) => {
                return boardSquare;

            })
            }
        </canvas>
    );
}

export default Board;