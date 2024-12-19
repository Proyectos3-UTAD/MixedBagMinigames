/**
 * Styles
 */
import '../../../../styles/snake/Fruit.css';

/**
 * Components
 */
import {ReactElement} from "react";

/**
 * Fruit component from the snake game.
 * Doesn't do any additional functionality.
 * @constructor
 */
function Fruit(): ReactElement {

    return (

		<div className={"fruit"}/>

    );

}

export default Fruit;