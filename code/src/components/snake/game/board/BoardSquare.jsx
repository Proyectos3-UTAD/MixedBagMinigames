/**
 * Styles
 */
import '../../../../styles/snake/Board.css';

/**
 * Components
 */

function BoardSquare({boardColor, rounded}) {

    return (
        <div
            className={`board-square ${boardColor}`}
            style={{
                borderRadius: rounded ? "0 0 5px 0" : "0"
            }}>
        </div>
    );
}

export default BoardSquare;