import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import background from './assets/background.png';
import bullet from './assets/bullet.png';
import enemy from './assets/enemy.png';
import player from './assets/player.png';
import ufo from './assets/ufo.png';

// Función para inicializar el juego
const initializeGame = (context, setIsGameRunning) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = '#000';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  const playerImage = new Image();
  playerImage.src = player;
  playerImage.onload = () => {
    context.drawImage(playerImage, context.canvas.width / 2 - 15, context.canvas.height - 30, 30, 30);
  };
  setIsGameRunning(true);
};

// Función del loop del juego
const gameLoop = (context, playerPosition) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = '#FFF';
  context.fillRect(50, 50, 100, 100);

  const playerImage = new Image();
  playerImage.src = player;
  playerImage.onload = () => {
    context.drawImage(playerImage, playerPosition.x, playerPosition.y, 30, 30);
  };
};

// Manejo de eventos de teclado
const handleKeyDown = (event, setPlayerPosition) => {
  if (event.key === 'ArrowLeft') {
    setPlayerPosition(prev => ({ ...prev, x: prev.x - 10 }));
  } else if (event.key === 'ArrowRight') {
    setPlayerPosition(prev => ({ ...prev, x: prev.x + 10 }));
  }
};

const handleKeyUp = (event) => {
  console.log('Key up:', event.key);
};

const SpaceInvaders = ({ screenChanger }) => {
  const canvasRef = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 550 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    initializeGame(context, setIsGameRunning);

    const gameInterval = setInterval(() => {
      if (isGameRunning) {
        gameLoop(context, playerPosition);
      }
    }, 1000 / 60);

    const handleKeyDownEvent = (event) => handleKeyDown(event, setPlayerPosition);
    const handleKeyUpEvent = (event) => handleKeyUp(event);

    window.addEventListener('keydown', handleKeyDownEvent);
    window.addEventListener('keyup', handleKeyUpEvent);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyDownEvent);
      window.removeEventListener('keyup', handleKeyUpEvent);
    };
  }, [isGameRunning, playerPosition]);

  const handleRestart = () => {
    setIsGameRunning(false);
    setTimeout(() => {
      initializeGame(canvasRef.current.getContext('2d'), setIsGameRunning);
      setPlayerPosition({ x: 400, y: 550 });
      setIsGameRunning(true);
    }, 100);
  };

  return (
    <div className="space-invaders-container">
      <canvas ref={canvasRef} width="800" height="600" className="game-canvas" />
      <div className="controls">
        <button onClick={handleRestart}>Restart</button>
        <button onClick={() => screenChanger(null)}>Exit</button>
      </div>
    </div>
  );
};

export default SpaceInvaders;
