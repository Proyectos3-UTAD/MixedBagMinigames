import '../../styles/menu/GameMiniature.css';
import {Link} from "react-router-dom";

function GameMiniature({gameName, gameCssClass, gameLink}) {

    return (
        <Link to={gameLink} className={`GameMiniature ${gameCssClass}`}>
            <p>{gameName}</p>
        </Link>
    );

}

export default GameMiniature;