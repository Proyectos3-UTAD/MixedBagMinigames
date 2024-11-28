<<<<<<< Updated upstream
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
=======
import React, { useState, useEffect } from "react";
import "./style.css";
import { useInterval } from "./useInterval";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_SPEED,
  BULLET_SPEED,
  ENEMY_SPEED,
  GAME_SPEED,
  START_POSITION,
} from "./constants";

const SpaceInvaders = ({ mode = "normal", onReturnToMenu }) => {
  const [player, setPlayer] = useState({
    x: START_POSITION.x,
    y: CANVAS_HEIGHT - 60,
  });
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [direction, setDirection] = useState(1); // 1 = derecha, -1 = izquierda
  const [enemySpeed, setEnemySpeed] = useState(
    mode === "speed" ? ENEMY_SPEED * 1.5 : ENEMY_SPEED
  ); // Ajustar velocidad según el modo
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Inicializar enemigos con 4 enemigos en la fila
  useEffect(() => {
    const initialEnemies = Array(4)
      .fill(0)
      .map((_, i) => ({ x: 100 + i * 120, y: 50 }));
    setEnemies(initialEnemies);
  }, []);

  // Mover jugador
  const movePlayer = (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) {
      setPlayer((prev) => ({ ...prev, x: prev.x - PLAYER_SPEED }));
    } else if (e.key === "ArrowRight" && player.x < CANVAS_WIDTH - 50) {
      setPlayer((prev) => ({ ...prev, x: prev.x + PLAYER_SPEED }));
    }
  };

  // Disparar bala
  const shootBullet = () => {
    setBullets((prev) => [
      ...prev,
      { x: player.x + 20, y: player.y - 10 },
    ]);
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === " ") {
        shootBullet();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [player]);

  // Mover balas
  useInterval(() => {
    setBullets((prev) =>
      prev
        .map((bullet) => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
        .filter((bullet) => bullet.y > 0)
    );
  }, GAME_SPEED);

  // Mover enemigos con velocidad ajustada
  useInterval(() => {
    if (enemies.length === 0) {
      const newEnemies = Array(4)
        .fill(0)
        .map((_, i) => ({ x: 100 + i * 120, y: 50 }));
      setEnemies(newEnemies);
      setEnemySpeed((prev) => prev + 0.5); // Incrementar velocidad
      return;
    }

    let shouldDescend = false;

    const updatedEnemies = enemies.map((enemy) => {
      const newX = enemy.x + direction * enemySpeed; // Usar velocidad dinámica
      if (newX < 0 || newX > CANVAS_WIDTH - 50) {
        shouldDescend = true;
      }
      return { ...enemy, x: newX };
    });

    if (shouldDescend) {
      setEnemies((prev) =>
        prev.map((enemy) => ({ ...enemy, y: enemy.y + 50 })) // Los enemigos bajan
      );
      setDirection((prev) => -prev); // Cambiar dirección
    } else {
      setEnemies(updatedEnemies);
    }
  }, GAME_SPEED);

  // Detectar colisiones entre balas y enemigos
  useEffect(() => {
    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (
          bullet.x > enemy.x &&
          bullet.x < enemy.x + 50 &&
          bullet.y > enemy.y &&
          bullet.y < enemy.y + 50
        ) {
          setEnemies((prev) => prev.filter((e) => e !== enemy));
          setBullets((prev) => prev.filter((b) => b !== bullet));
          setScore((prev) => prev + 10);
        }
      });
    });
  }, [bullets, enemies]);

  // Detectar Game Over cuando un enemigo alcanza al jugador
  useEffect(() => {
    if (enemies.some((enemy) => enemy.y >= player.y - 50)) {
      setGameOver(true);
    }
  }, [enemies]);

  // Movimiento del jugador con teclas
  useEffect(() => {
    window.addEventListener("keydown", movePlayer);
    return () => {
      window.removeEventListener("keydown", movePlayer);
    };
  }, [player]);

  // Reiniciar juego
  const resetGame = () => {
    setPlayer({ x: START_POSITION.x, y: CANVAS_HEIGHT - 60 });
    setBullets([]);
    setEnemies(
      Array(4)
        .fill(0)
        .map((_, i) => ({ x: 100 + i * 120, y: 50 }))
    );
    setScore(0);
    setDirection(1);
    setEnemySpeed(mode === "speed" ? ENEMY_SPEED * 1.5 : ENEMY_SPEED);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="game-container">
        <div className="game-over-screen">
          <h1>Game Over</h1>
          <h2>Final Score: {score}</h2>
          <div className="buttons">
            <button className="menu-button" onClick={onReturnToMenu}>
              Menu
            </button>
            <button className="retry-button" onClick={resetGame}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="canvas">
        {/* Dibujar jugador */}
        <div
          className="player"
          style={{ left: player.x, top: player.y }}
        ></div>

        {/* Dibujar balas */}
        {bullets.map((bullet, index) => (
          <div
            key={index}
            className="bullet"
            style={{ left: bullet.x, top: bullet.y }}
          ></div>
        ))}

        {/* Dibujar enemigos */}
        {enemies.map((enemy, index) => (
          <div
            key={index}
            className="enemy"
            style={{ left: enemy.x, top: enemy.y }}
          ></div>
        ))}

        {/* Mostrar puntaje */}
        <div className="score">Score: {score}</div>
      </div>

      {/* Botón para volver al menú */}
      <button
        className="back-to-menu"
        onClick={onReturnToMenu}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "calc(50% - 50px)",
        }}
      >
        Menu
      </button>
    </div>
  );
>>>>>>> Stashed changes
};

export default SpaceInvaders;
