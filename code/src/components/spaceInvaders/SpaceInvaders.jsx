import { useEffect, useRef, useState } from 'react';
import HomeMenuButton from "../common/HomeMenuButton";
import { gameLoop } from './game-loop'; // Importamos solo gameLoop
import { Stage } from './stage'; // Importa el componente Stage para renderizar la escena
import * as config from './config'; // Importamos todos los exports de config como un objeto
import { controls } from './controls'; // Importamos los controles

function SpaceInvaders({ screenChanger, store }) {
    const [, forceUpdate] = useState(0); // Usamos un estado para forzar la actualización

    useEffect(() => {
        controls(store);
        gameLoop(elapsedTime => store.dispatch({ type: 'UPDATE', elapsedTime }));

        const unsubscribe = store.subscribe(() => forceUpdate(n => n + 1)); // Forzamos la actualización

        return () => {
            unsubscribe();
            window.removeEventListener('keydown', controls.onKeydown);
            window.removeEventListener('keyup', controls.onKeyup);
        };
    }, [store]);

    return (
        <div>
            <h1>Space Invaders</h1>
            <Stage state={store.getState()} />
            <HomeMenuButton screenChanger={screenChanger} />
        </div>
    );
}

export default SpaceInvaders;
