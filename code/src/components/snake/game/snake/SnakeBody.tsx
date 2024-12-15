import '../../../../styles/snake/Snake.css'
import {ReactElement} from "react";
/**
 * Snale body component.
 * @returns 
 */
function SnakeBody({direction}): ReactElement {

    return (
        <div className={`snake-body-part ${direction}`}></div>
    );

}

export default SnakeBody;