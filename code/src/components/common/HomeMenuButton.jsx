import {Link} from "react-router-dom";

/**
 * Changes the screen displayed to the menu of the application.
 * @returns
 */
function HomeMenuButton({classname}) {

    return (
        <Link to={"/"} className={classname}>
            Home
        </Link>
    );
}

export default HomeMenuButton;