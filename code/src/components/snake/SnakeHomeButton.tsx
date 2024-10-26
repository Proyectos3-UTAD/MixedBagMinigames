import SnakeHomeScreen from "./SnakeHomeScreen.tsx";
import {ReactElement} from "react";

/**
 * Component to return to the main Snake minigame screen
 * @param screenChanger The function to change the screen to something else.
 * @returns {JSX.Element} The button to return to the snake minigame main screen
 * @constructor
 */
function SnakeHomeButton({screenChanger}): ReactElement {

    const returnHome = (): void => {
        screenChanger(<SnakeHomeScreen screenChanger={screenChanger}/>);
    }

    return (
        <button onClick={returnHome}>
            Snake
        </button>
    );
}

export default SnakeHomeButton;