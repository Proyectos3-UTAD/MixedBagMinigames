import '../../styles/menu/GameMiniature.css';

function GameMiniature({gameName, screenChanger, gameComponent}) {

    const loadGame = () => {
        screenChanger(gameComponent);
    }

    return (
        <div onClick={loadGame} className="GameMiniature">
            <p>{gameName}</p>
        </div>
    );

}

export default GameMiniature;