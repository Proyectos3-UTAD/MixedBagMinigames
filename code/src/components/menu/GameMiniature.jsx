import '../../styles/menu/GameMiniature.css';

function GameMiniature({gameName, gameCssClass, screenChanger, gameComponent}) {

    const loadGame = () => {
        screenChanger(gameComponent);
    }

    return (
        <div onClick={loadGame} className={`GameMiniature ${gameCssClass}`}>
            <p>{gameName}</p>
        </div>
    );

}

export default GameMiniature;