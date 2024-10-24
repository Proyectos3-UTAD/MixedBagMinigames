/**
 * Styles
 */
import '../../../../styles/snake/Board.css';

/**
 * Components
 */

function BoardSquare({content, className}) {
    return (
        <div className={className}>
            {content}
        </div>
    );
}

export default BoardSquare;