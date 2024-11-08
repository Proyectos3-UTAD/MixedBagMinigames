/**
 * Styles
 */
import '../../../../styles/snake/Board.css';

/**
 * Components
 */
import {ReactElement} from "react";

function BoardTile({content, classNames}): ReactElement {
    return (
        <div className={classNames}>
            {content}
        </div>
    );
}

export default BoardTile;