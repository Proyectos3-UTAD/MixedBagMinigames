import '../../../../styles/snake/Snake.css'
import {ReactElement} from "react";
/**
 * Snake head component.
 * @returns 
 */
function SnakeHead({direction}): ReactElement {

    return (
        <div className={`snake-head ${direction}`}/>
	);

}

export default SnakeHead;