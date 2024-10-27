import { useEffect, useRef } from 'react';
import HomeMenuButton from "../common/HomeMenuButton";
import { gameLoop } from './game-loop'; // Importamos solo gameLoop
import * as config from './config'; // Importamos todos los exports de config como un objeto

function SpaceInvaders({ screenChanger }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Inicialización del juego y bucle principal
        const loop = () => {
            gameLoop(context, config);
            requestAnimationFrame(loop);
        };
        loop();

        return () => {
            // Cleanup si es necesario
        };
    }, []);

    return (
        <div>
            <h1>Space Invaders</h1>
            <canvas ref={canvasRef} width={config.worldWidth} height={config.worldHeight} />
            <HomeMenuButton screenChanger={screenChanger} />
        </div>
    );
}

export default SpaceInvaders;
