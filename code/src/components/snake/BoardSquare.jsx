/**
 * Styles
 */
import '../../styles/snake/Board.css';

/**
 * Components
 */

function BoardSquare({boardColor, rounded}) {

    return (
        <div
            className={`board-square ${boardColor}`}
            style={{
                borderRadius: rounded ? "5px" : "0"
            }}>
        </div>
    );
}

export default BoardSquare;