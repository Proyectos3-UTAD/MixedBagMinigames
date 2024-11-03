// src/components/pacMan/pacMan.jsx
import React, { useEffect, useState } from 'react';
import HomeMenuButton from "../common/HomeMenuButton";
import '../../styles/pacMan/pacMan.css';

function PacMan({ screenChanger }) {
    const areaSize = 500;
    const pacmanSize = 20;
    const enemySize = 20;
    const pointSize = 10;

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [enemies, setEnemies] = useState([
        { x: 100, y: 100 },
        { x: 300, y: 200 },
        { x: 200, y: 300 },
    ]);
    const [points, setPoints] = useState([
        { x: 150, y: 150 },
        { x: 350, y: 250 },
        { x: 250, y: 350 },
    ]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [enemySpeed, setEnemySpeed] = useState(500);

    // Mover Pac-Man con las teclas de flecha
    useEffect(() => {
        function handleKeyPress(e) {
            let { x, y } = position;
            switch (e.key) {
                case 'ArrowUp': y = Math.max(0, y - 10); break;
                case 'ArrowDown': y = Math.min(areaSize - pacmanSize, y + 10); break;
                case 'ArrowLeft': x = Math.max(0, x - 10); break;
                case 'ArrowRight': x = Math.min(areaSize - pacmanSize, x + 10); break;
                default: return;
            }
            setPosition({ x, y });
        }

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [position]);

    // Mover a los enemigos aleatoriamente
    useEffect(() => {
        const interval = setInterval(() => {
            setEnemies(enemies => enemies.map(enemy => {
                let x = enemy.x + (Math.random() > 0.5 ? 10 : -10);
                let y = enemy.y + (Math.random() > 0.5 ? 10 : -10);

                // Limitar el movimiento al área de juego
                x = Math.max(0, Math.min(areaSize - enemySize, x));
                y = Math.max(0, Math.min(areaSize - enemySize, y));
                return { x, y };
            }));
        }, enemySpeed);

        return () => clearInterval(interval);
    }, [enemySpeed]);

    // Detección de colisiones con enemigos y puntos
    useEffect(() => {
        function checkCollisions() {
            // Colisiones con enemigos
            for (let enemy of enemies) {
                if (
                    position.x < enemy.x + enemySize &&
                    position.x + pacmanSize > enemy.x &&
                    position.y < enemy.y + enemySize &&
                    position.y + pacmanSize > enemy.y
                ) {
                    setLives(lives - 1);
                    setPosition({ x: 0, y: 0 }); // Reiniciar posición de Pac-Man

                    // Reiniciar posición de los enemigos
                    setEnemies([
                        { x: 100, y: 100 },
                        { x: 300, y: 200 },
                        { x: 200, y: 300 },
                    ]);

                    if (lives - 1 === 0) {
                        alert("Juego terminado. ¡Puntuación final: " + score + "!");
                        setScore(0);
                        setLives(3);
                        setEnemySpeed(500);
                    }
                    break;
                }
            }

            // Colisiones con puntos
            setPoints(points => points.filter(point => {
                if (
                    position.x < point.x + pointSize &&
                    position.x + pacmanSize > point.x &&
                    position.y < point.y + pointSize &&
                    position.y + pacmanSize > point.y
                ) {
                    setScore(score + 10);
                    return false; // Elimina el punto recolectado
                }
                return true;
            }));
        }

        checkCollisions();
    }, [position, enemies, points, score, lives]);

    // Incrementar la dificultad (acelerar enemigos) cada 20 puntos
    useEffect(() => {
        if (score > 0 && score % 20 === 0) {
            setEnemySpeed(speed => Math.max(100, speed - 50)); // Limitar velocidad mínima
        }
    }, [score]);

    return (
        <div className="pacman-container">
            <h1>Pac-Man</h1>
            <p>Puntuación: {score}</p>
            <p>Vidas: {lives}</p>
            <div className="game-area">
                {/* Pac-Man */}
                <div
                    className="pacman"
                    style={{ left: position.x, top: position.y }}
                ></div>

                {/* Enemigos */}
                {enemies.map((enemy, index) => (
                    <div
                        key={index}
                        className="enemy"
                        style={{ left: enemy.x, top: enemy.y }}
                    ></div>
                ))}

                {/* Puntos */}
                {points.map((point, index) => (
                    <div
                        key={index}
                        className="point"
                        style={{ left: point.x, top: point.y }}
                    ></div>
                ))}
            </div>
            <HomeMenuButton screenChanger={screenChanger} />
        </div>
    );
}

export default PacMan;
