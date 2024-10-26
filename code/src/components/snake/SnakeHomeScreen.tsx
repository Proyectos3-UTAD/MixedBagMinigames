/**
 * Styles
 */

/**
 * Components
 */
import HomeMenuButton from "../common/HomeMenuButton";
import Board from "./game/board/Board";
import {useState, ReactElement} from "react";
import SnakeGameScreen from "./game/SnakeGameScreen.tsx";

// import SnakeImported from "./import/SnakeImported";
/**
 * Home screen of the snake minigame.
 * @param screenChanger The state setter to change the screen contents.
 * @returns {JSX.Element} The main menu of the snake mini game
 * @constructor
 */
function SnakeHomeScreen({screenChanger}): ReactElement {

    /*Partes del juego de la serpiente:

       - Moverse
            - Detectar teclas (Done)
            - Obtener dirección de movimiento
            - Actualizar posición de la serpiente
            - Pintar por pantalla (Done)

       - Colisionar
            - Detectar con que
                - Pared o cuerpo
                    - Morir
                - Fruta
                    - Comer
                    - Pintar nueva fruta (Done)
       - Comer
            - Generar nuevo bloque de serpiente
            - Situarlo en la parte posterior de la cola cuando avance
            - Actualizar marcador


    */

    const [gameOptions, setGameOptions] = useState({
        boardDimensions: {
            width: 10,
            height: 10,
        },
        fruitsOnScreen: 1,
        snakeSpeed: 1,
    });

    const startGame = (): void => {
        screenChanger(<SnakeGameScreen screenChanger={screenChanger} gameOptions={gameOptions}/>)
    }
    return (
        <div>
            {/*<SnakeImported/>*/}
            <h1>Snake</h1>
            <button
                onClick={startGame}>Play
            </button>
            <p>Mode</p>
            <p>Scores</p>
        </div>
    );
}

export default SnakeHomeScreen;