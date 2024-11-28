// space-invader.jsx
import React, {useState, useEffect, useCallback} from 'react';
import {useInterval} from './useInterval';
import HomeMenuButton from '../common/HomeMenuButton';
import {
    START_POSITION,
    START_ENEMIES_POSITION,
    GAME_SPEED,
    BULLET_SPEED,
    ENEMY_SPEED,
    PLAYER_SPEED,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from './constants';

import playerImg from '../../static/images/spaceInvaders/player.png';
import bulletImg from '../../static/images/spaceInvaders/bullet.png';
import enemyImg from '../../static/images/spaceInvaders/enemy.png';
import backgroundImg from '../../static/images/spaceInvaders/background.png';

const SpaceInvaders = ({screenChanger}) => {
    const [player, setPlayer] = useState({x: START_POSITION.x, y: 10});
    const [bullets, setBullets] = useState([]);
    const [enemies, setEnemies] = useState([...START_ENEMIES_POSITION]);
    const [score, setScore] = useState(0);
    const [enemyDirection, setEnemyDirection] = useState(1);  // Dirección inicial de los enemigos (1 = derecha, -1 = izquierda)

    // Función para mover el jugador
    const movePlayer = useCallback((direction) => {
        setPlayer((prev) => ({
            ...prev,
            x: Math.max(0, Math.min(CANVAS_WIDTH - 40, prev.x + direction * PLAYER_SPEED))
        }));
    }, []);

    // Disparo del jugador
    const fireBullet = () => {
        setBullets((prevBullets) => [
            ...prevBullets,
            {x: player.x + 15, y: player.y + 20}  // Proyectil se dispara desde la parte superior de la nave
        ]);
    };

    // Movimiento de los proyectiles hacia arriba
    const moveBullets = () => {
        setBullets((prevBullets) =>
            prevBullets
                .map((bullet) => ({
                    ...bullet,
                    y: bullet.y + BULLET_SPEED
                })) // Mueve los proyectiles hacia arriba (reduce y)
                .filter((bullet) => bullet.y < CANVAS_HEIGHT) // Filtra los proyectiles que están fuera de la pantalla
        );
    };

    // Movimiento de los enemigos en bloque
    const moveEnemies = () => {
        setEnemies((prevEnemies) => {
            const reachedRightEdge = prevEnemies.some(enemy => enemy.x + ENEMY_SPEED > CANVAS_WIDTH - 40);
            const reachedLeftEdge = prevEnemies.some(enemy => enemy.x - ENEMY_SPEED < 0);

            if (reachedRightEdge || reachedLeftEdge) {
                setEnemyDirection(prevDirection => -prevDirection);

                // Descender enemigos una fila
                return prevEnemies.map(enemy => ({
                    ...enemy,
                    y: enemy.y + 40  // Baja una fila
                }));
            } else {
                // Mover enemigos en la dirección actual sin cambiar de fila
                return prevEnemies.map(enemy => ({
                    ...enemy,
                    x: enemy.x + ENEMY_SPEED * enemyDirection,
                }));
            }
        });
    };

    // Verificar colisiones entre proyectiles y enemigos
    const checkCollisions = () => {
        setEnemies((prevEnemies) =>
            prevEnemies.filter((enemy) => {
                const hit = bullets.some(
                    (bullet) =>
                        bullet.x > enemy.x &&
                        bullet.x < enemy.x + 40 &&
                        bullet.y > enemy.y &&
                        bullet.y < enemy.y + 40
                );
                if (hit) setScore((prevScore) => prevScore + 10); // Aumenta el puntaje
                return !hit;
            })
        );
        setBullets((prevBullets) =>
            prevBullets.filter((bullet) => {
                return !enemies.some(
                    (enemy) =>
                        bullet.x > enemy.x &&
                        bullet.x < enemy.x + 40 &&
                        bullet.y > enemy.y &&
                        bullet.y < enemy.y + 40
                );
            })
        );
    };

    // Capturar eventos de teclado
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') movePlayer(-1);
        if (e.key === 'ArrowRight') movePlayer(1);
        if (e.key === ' ') fireBullet();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Bucle principal del juego
    useInterval(() => {
        moveBullets();
        moveEnemies();
        checkCollisions();
    }, GAME_SPEED);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
            {/* Botón Home */}
            <div style={{marginBottom: '10px'}}>
                <HomeMenuButton screenChanger={screenChanger}/>
            </div>

            {/* Contenedor del juego centrado */}
            <div style={{
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover'
            }}>
                {/* Jugador */}
                <div
                    style={{
                        position: 'absolute',
                        left: player.x,
                        bottom: player.y,
                        width: 40,
                        height: 40,
                        backgroundImage: `url(${playerImg})`,
                        backgroundSize: 'cover'
                    }}
                />

                {/* Proyectiles */}
                {bullets.map((bullet, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: bullet.x,
                            bottom: bullet.y, // Mueve el proyectil desde abajo hacia arriba
                            width: 10,
                            height: 20,
                            backgroundImage: `url(${bulletImg})`,
                            backgroundSize: 'cover'
                        }}
                    />
                ))}

                {/* Enemigos */}
                {enemies.map((enemy, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: enemy.x,
                            top: enemy.y,
                            width: 40,
                            height: 40,
                            backgroundImage: `url(${enemyImg})`,
                            backgroundSize: 'cover'
                        }}
                    />
                ))}

                {/* Marcador */}
                <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: 'white',
                    fontSize: '24px'
                }}>Puntuación: {score}</div>
            </div>
        </div>
    );
};

export default SpaceInvaders;