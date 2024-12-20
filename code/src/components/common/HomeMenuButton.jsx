import {Link} from "react-router-dom";

/**
 * Changes the screen displayed to the menu of the application.
 * @returns
 */
function HomeMenuButton({className}) {

    return (
        <Link className={className} to={"/"}>
            Home
        </Link>
    );
}

export default HomeMenuButton;