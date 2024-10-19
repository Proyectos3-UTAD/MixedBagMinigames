/**
 * Styles
 */

/**
 * Components
 */
import HomeMenuButton from "../common/HomeMenuButton";
import Board from "./Board";


function SnakeGame({screenChanger}) {
    return (
        <div>
            <h1>Snake</h1>
            <Board boardHeight={9} boardWidth={9}/>
            <HomeMenuButton screenChanger={screenChanger}/>

        </div>
    );
}

export default SnakeGame;