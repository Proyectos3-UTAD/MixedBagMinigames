/**
 * Styles
 */
import '../../../../styles/snake/Board.css';

/**
 * Components
 */
import {ReactElement} from "react";

function BoardSquare({content, classNames}): ReactElement {
    return (
        <div className={classNames}>
            {content}
        </div>
    );
}

export default BoardSquare;