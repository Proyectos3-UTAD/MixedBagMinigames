/**
 * Styles
 */

/**
 * Components
 */
import SnakeGameScreen from "./game/SnakeGameScreen.tsx";
import HomeMenuButton from "../common/HomeMenuButton";

/**
 * Modules
 */
import {useState, ReactElement} from "react";

/**
 * Classes
 */
import GameSettings from "./settings/GameSettings.ts";

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

    const [gameSettings, ] = useState(new GameSettings());

    const startGame = (): void => {
        screenChanger(<SnakeGameScreen screenChanger={screenChanger} gameSettings={gameSettings}/>)
    }


    return (
        <div>
            <h1>Snake</h1>
            <button
                onClick={startGame}>Play
            </button>
            <HomeMenuButton screenChanger={screenChanger}/>
            <p>Mode</p>
            <p>Scores</p>
        </div>
    );
}

export default SnakeHomeScreen;