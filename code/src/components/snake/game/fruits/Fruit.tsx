/**
 * Styles
 */
import '../../../../styles/snake/Fruit.css';
// import '../../../../static/images/snake/apple.png';

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

		<div className={"fruit"}>

		</div>
        // <img src='../../../../static/images/snake/Menu.gif' alt="" className={"Fruit"}/>
        // <img src='../../../../static/images/snake/apple.png' alt="" className={"Fruit"}/>

    );

}

export default Fruit;