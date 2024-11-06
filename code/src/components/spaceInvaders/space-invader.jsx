import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from './useInterval';
import {
  START_POSITION,
  START_ENEMIES_POSITION,
  GAME_SPEED,
  BULLET_SPEED,
  ENEMY_SPEED,
  UFO_SPEED,
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
  const [enemies, setEnemies] = useState(START_ENEMIES_POSITION);
  const [score, setScore] = useState(0);

  const movePlayer = useCallback((direction) => {
    setPlayer((prev) => ({
      x: Math.min(
        Math.max(0, prev.x + direction * PLAYER_SPEED),
        CANVAS_WIDTH
      ),
      y: prev.y,
    }));
  }, []);

  const fireBullet = () => {
    setBullets((prev) => [
      ...prev,
      { x: player.x + 15, y: player.y - 10 }
    ]);
  };

  const moveBullets = () => {
    setBullets((prev) =>
      prev
        .map((bullet) => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
        .filter((bullet) => bullet.y > 0)
    );
  };

  const moveEnemies = () => {
    setEnemies((prev) =>
      prev.map((enemy) => ({
        x: enemy.x,
        y: enemy.y + ENEMY_SPEED
      }))
    );
  };

  const checkCollisions = () => {
    setBullets((prevBullets) =>
      prevBullets.filter((bullet) => {
        const hit = enemies.some(
          (enemy) =>
            bullet.x > enemy.x &&
            bullet.x < enemy.x + 40 &&
            bullet.y > enemy.y &&
            bullet.y < enemy.y + 40
        );
        if (hit) setScore((prev) => prev + 10);
        return !hit;
      })
    );

    setEnemies((prevEnemies) =>
      prevEnemies.filter(
        (enemy) =>
          !bullets.some(
            (bullet) =>
              bullet.x > enemy.x &&
              bullet.x < enemy.x + 40 &&
              bullet.y > enemy.y &&
              bullet.y < enemy.y + 40
          )
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') movePlayer(-1);
    if (e.key === 'ArrowRight') movePlayer(1);
    if (e.key === ' ') fireBullet();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useInterval(() => {
    moveBullets();
    moveEnemies();
    checkCollisions();
  }, GAME_SPEED);

  return (
    <div style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, backgroundImage: `url(${backgroundImg})`, position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          left: player.x,
          bottom: player.y,
          width: 40,
          height: 40,
          backgroundImage: `url(${playerImg})`,
        }}
      />
      {bullets.map((bullet, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: bullet.x,
            bottom: bullet.y,
            width: 10,
            height: 20,
            backgroundImage: `url(${bulletImg})`,
          }}
        />
      ))}
      {enemies.map((enemy, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: enemy.x,
            bottom: enemy.y,
            width: 40,
            height: 40,
            backgroundImage: `url(${enemyImg})`,
          }}
        />
      ))}
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>Score: {score}</div>
    </div>
  );
};

export default SpaceInvaders;