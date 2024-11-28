import React, { useState, useEffect } from "react";
import "./style.css";
import { useInterval } from "./useInterval";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_SPEED,
  BULLET_SPEED,
  GAME_SPEED,
  START_POSITION,
} from "./constants";

const ClassicSpaceInvaders = ({ onReturnToMenu }) => {
  const [player, setPlayer] = useState({
    x: START_POSITION.x,
    y: CANVAS_HEIGHT - 60,
  });
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [direction, setDirection] = useState(1); // 1 = derecha, -1 = izquierda
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1); // Nivel inicial
  const [enemySpeed, setEnemySpeed] = useState(GAME_SPEED / 8); // Velocidad inicial de los enemigos

  // Configuración inicial de los enemigos (4 filas x 5 columnas)
  const generateEnemies = () => {
    const rows = 4;
    const cols = 5;
    const initialEnemies = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        initialEnemies.push({
          x: 100 + col * 80,
          y: 50 + row * 60,
          id: `${row}-${col}`,
        });
      }
    }
    return initialEnemies;
  };

  // Inicializar enemigos al comienzo del juego
  useEffect(() => {
    setEnemies(generateEnemies());
    setLevel(1); // Asegurar que el nivel comience en 1
  }, []);

  // Mover jugador
  const movePlayer = (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) {
      setPlayer((prev) => ({ ...prev, x: prev.x - PLAYER_SPEED }));
    } else if (e.key === "ArrowRight" && player.x < CANVAS_WIDTH - 50) {
      setPlayer((prev) => ({ ...prev, x: prev.x + PLAYER_SPEED }));
    }
  };

  // Disparar bala del jugador
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

  // Mover balas del jugador
  useInterval(() => {
    setBullets((prev) =>
      prev
        .map((bullet) => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
        .filter((bullet) => bullet.y > 0)
    );
  }, GAME_SPEED);

  // Mover enemigos con velocidad dinámica
  useInterval(() => {
    if (enemies.length === 0) return; // No mover si no hay enemigos

    let shouldDescend = false;

    const updatedEnemies = enemies.map((enemy) => {
      const newX = enemy.x + direction * enemySpeed;
      if (newX < 0 || newX > CANVAS_WIDTH - 50) {
        shouldDescend = true;
      }
      return { ...enemy, x: newX };
    });

    if (shouldDescend) {
      setEnemies((prev) =>
        prev.map((enemy) => ({ ...enemy, y: enemy.y + 50 }))
      );
      setDirection((prev) => -prev);
    } else {
      setEnemies(updatedEnemies);
    }
  }, GAME_SPEED * 5); // Movimiento lento al inicio

  // Disparos aleatorios de los enemigos
  useInterval(() => {
    if (enemies.length > 0) {
      const shootingEnemy =
        enemies[Math.floor(Math.random() * enemies.length)];
      setEnemyBullets((prev) => [
        ...prev,
        { x: shootingEnemy.x + 25, y: shootingEnemy.y + 50 },
      ]);
    }
  }, 1500);

  // Mover balas de los enemigos
  useInterval(() => {
    setEnemyBullets((prev) =>
      prev
        .map((bullet) => ({ ...bullet, y: bullet.y + BULLET_SPEED }))
        .filter((bullet) => bullet.y < CANVAS_HEIGHT)
    );
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

  // Detectar colisiones entre balas de enemigos y el jugador
  useEffect(() => {
    enemyBullets.forEach((bullet) => {
      if (
        bullet.x > player.x &&
        bullet.x < player.x + 50 &&
        bullet.y > player.y &&
        bullet.y < player.y + 50
      ) {
        setGameOver(true);
      }
    });
  }, [enemyBullets]);

  // Detectar Game Over cuando un enemigo alcanza al jugador
  useEffect(() => {
    if (enemies.some((enemy) => enemy.y >= player.y - 50)) {
      setGameOver(true);
    }
  }, [enemies]);

  // Cuando todos los enemigos son eliminados
  useEffect(() => {
    if (enemies.length === 0 && !gameOver) {
      setLevel((prev) => prev + 1); // Incrementar nivel
      setEnemySpeed((prev) => prev + 0.5); // Incrementar velocidad
      setTimeout(() => setEnemies(generateEnemies()), 2000); // Regenerar enemigos tras 2 segundos
    }
  }, [enemies, gameOver]);

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
    setEnemyBullets([]);
    setEnemies(generateEnemies());
    setScore(0);
    setGameOver(false);
    setLevel(1); // Reiniciar nivel
    setEnemySpeed(GAME_SPEED / 8); // Reiniciar velocidad
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
      {/* Nivel mostrado */}
      <div className="level-display">Level {level}</div>

      <div className="canvas">
        <div className="player" style={{ left: player.x, top: player.y }}></div>

        {/* Balas del jugador */}
        {bullets.map((bullet, index) => (
          <div
            key={index}
            className="bullet"
            style={{ left: bullet.x, top: bullet.y }}
          ></div>
        ))}

        {/* Balas de los enemigos */}
        {enemyBullets.map((bullet, index) => (
          <div
            key={index}
            className="bullet enemy-bullet"
            style={{ left: bullet.x, top: bullet.y }}
          ></div>
        ))}

        {/* Enemigos */}
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            className="enemy"
            style={{ left: enemy.x, top: enemy.y }}
          ></div>
        ))}

        {/* Puntaje */}
        <div className="score">Score: {score}</div>
      </div>
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
};

export default ClassicSpaceInvaders;