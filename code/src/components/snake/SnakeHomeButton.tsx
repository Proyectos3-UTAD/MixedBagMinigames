/**
 * Modules
 */
import { ReactElement } from "react";
import { Link } from "react-router-dom";


/**
 * Component to return to the main Snake minigame screen
 * @param screenChanger The function to change the screen to something else.
 * @returns {JSX.Element} The button to return to the snake minigame main screen
 * @constructor
 */
function SnakeHomeButton({ className }): ReactElement {


	return (
		<Link to={'/Snake'} className={className}>
			Snake
		</Link>
	);

}

export default SnakeHomeButton;