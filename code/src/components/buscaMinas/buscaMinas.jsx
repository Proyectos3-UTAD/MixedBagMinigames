import React, { useState, useEffect } from "react";
import HomeMenuButton from "../common/HomeMenuButton";


function BuscaMinas({ screenChanger }) {
    const rows = 10;       // Número de filas en la cuadrícula
    const cols = 10;       // Número de columnas en la cuadrícula
    const totalMines = 15; // Total de minas en el juego
  
    const [grid, setGrid] = useState([]); // Estado de la cuadrícula
  
    // Función para crear la cuadrícula inicial del juego
    const createGrid = () => {
      let newGrid = [];
      for (let row = 0; row < rows; row++) {
        let newRow = [];
        for (let col = 0; col < cols; col++) {
          newRow.push({
            revealed: false,    // Indica si la celda ha sido revelada
            mine: false,        // Indica si la celda contiene una mina
            adjacentMines: 0    // Número de minas adyacentes a esta celda
          });
        }
        newGrid.push(newRow);
      }
      return newGrid;
    };
  
    // Función para colocar minas aleatoriamente en la cuadrícula
    const placeMines = (grid) => {
      let minesPlaced = 0;
      while (minesPlaced < totalMines) {
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * cols);
        if (!grid[row][col].mine) {
          grid[row][col].mine = true;
          minesPlaced++;
        }
      }
    };
  
    // Función para calcular las minas adyacentes a cada celda
    const calculateAdjacentMines = (grid) => {
      const countAdjacentMines = (row, col) => {
        let mines = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              if (grid[newRow][newCol].mine) {
                mines++;
              }
            }
          }
        }
        return mines;
      };
  
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (!grid[row][col].mine) {
            grid[row][col].adjacentMines = countAdjacentMines(row, col);
          }
        }
      }
    };
  
    // Efecto para inicializar el juego
    useEffect(() => {
      const newGrid = createGrid();       // Crea la cuadrícula inicial
      placeMines(newGrid);                // Coloca minas aleatoriamente
      calculateAdjacentMines(newGrid);    // Calcula minas adyacentes
      setGrid(newGrid);                   // Actualiza el estado de la cuadrícula
    }, []);
  
    // Función para manejar el clic en una celda
    const handleCellClick = (row, col) => {
      let newGrid = [...grid];
      let cell = newGrid[row][col];
      if (cell.revealed) return; // Si la celda ya está revelada, no hacer nada
  
      cell.revealed = true;
  
      if (cell.mine) {
        alert("¡Boom! Has perdido."); // Si hay una mina, el jugador pierde
        revealMines(newGrid);         // Revela todas las minas en la cuadrícula
      } else {
        if (cell.adjacentMines === 0) {
          revealAdjacentCells(newGrid, row, col); // Si no hay minas adyacentes, revela celdas vecinas
        }
      }
      setGrid(newGrid); // Actualiza el estado de la cuadrícula
    };
  
    // Función para revelar celdas adyacentes
    const revealAdjacentCells = (grid, row, col) => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (!grid[newRow][newCol].revealed && !grid[newRow][newCol].mine) {
              grid[newRow][newCol].revealed = true;
              if (grid[newRow][newCol].adjacentMines === 0) {
                revealAdjacentCells(grid, newRow, newCol); // Recursión para celdas vacías
              }
            }
          }
        }
      }
    };
  
    // Función para revelar todas las minas (al perder)
    const revealMines = (grid) => {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (grid[row][col].mine) {
            grid[row][col].revealed = true;
          }
        }
      }
    };
  
    // Función para reiniciar el juego
    const resetGame = () => {
      const newGrid = createGrid();
      placeMines(newGrid);
      calculateAdjacentMines(newGrid);
      setGrid(newGrid);
    };
    return (
        <div>
            <h1>BuscaMinas</h1>
            <div className="grid-container">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <button key={colIndex} className={`cell ${cell.revealed ? "revealed" : ""}`} onClick={() => handleCellClick(rowIndex, colIndex)}>
                                {cell.revealed && (cell.mine ? "💣" : cell.adjacentMines > 0 ? cell.adjacentMines : "")}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={resetGame}>Reiniciar</button>
            <HomeMenuButton screenChanger={screenChanger} />
        </div>
    );
}

export default BuscaMinas;