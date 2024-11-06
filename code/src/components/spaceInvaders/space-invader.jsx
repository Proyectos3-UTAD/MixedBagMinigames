import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from './useInterval';
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

import playerImg from './assets/player.png';
import bulletImg from './assets/bullet.png';
import enemyImg from './assets/enemy.png';
import ufoImg from './assets/ufo.png';
import backgroundImg from './assets/background.png';

const SpaceInvaders = () => {
  const [player, setPlayer] = useState({ ...START_POSITION });
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([...START_ENEMIES_POSITION]);
  const [score, setScore] = useState(0);
  const [enemyDirection, setEnemyDirection] = useState(1);

  // Movimiento del jugador
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
      { x: player.x + 15, y: player.y - 20 }
    ]);
  };

  // Movimiento de los proyectiles
  const moveBullets = () => {
    setBullets((prevBullets) =>
      prevBullets
        .map((bullet) => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
        .filter((bullet) => bullet.y > 0) // Remueve los proyectiles fuera de la pantalla
    );
  };

  // Movimiento de los enemigos
  const moveEnemies = () => {
    setEnemies((prevEnemies) => {
      const reachedEdge = prevEnemies.some(
        (enemy) => enemy.x + enemyDirection * ENEMY_SPEED < 0 || enemy.x + enemyDirection * ENEMY_SPEED > CANVAS_WIDTH - 40
      );
      const newDirection = reachedEdge ? -enemyDirection : enemyDirection;

      if (reachedEdge) {
        setEnemyDirection(newDirection);
        return prevEnemies.map((enemy) => ({ ...enemy, y: enemy.y + 40 }));
      } else {
        return prevEnemies.map((enemy) => ({
          ...enemy,
          x: enemy.x + enemyDirection * ENEMY_SPEED
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
        if (hit) setScore((prevScore) => prevScore + 10);
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
    <div style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, backgroundImage: `url(${backgroundImg})`, position: 'relative', overflow: 'hidden' }}>
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
            bottom: bullet.y,
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
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', fontSize: '24px' }}>Puntuación: {score}</div>
    </div>
  );
};

export default SpaceInvaders;