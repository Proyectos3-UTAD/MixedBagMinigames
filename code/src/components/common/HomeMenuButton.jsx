import {Link} from "react-router-dom";

/**
 * Changes the screen displayed to the menu of the application.
 * @returns
 */
function HomeMenuButton() {

    return (
        <Link to={"/"}>
            Home
        </Link>
    );
}

export default HomeMenuButton;