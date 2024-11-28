import React, { useState, useEffect } from "react";
import HomeMenuButton from "../common/HomeMenuButton";
import '../../styles/buscaMinas/buscaMinas.css';

function BuscaMinas({ screenChanger }) {
    const rows = 10;
    const cols = 10;
    const totalMines = 15;

    const [grid, setGrid] = useState([]);
    const [minesLeft, setMinesLeft] = useState(totalMines);

    const createGrid = () => {
        let newGrid = [];
        for (let row = 0; row < rows; row++) {
            let newRow = [];
            for (let col = 0; col < cols; col++) {
                newRow.push({
                    revealed: false,
                    mine: false,
                    adjacentMines: 0,
                    flagged: false
                });
            }
            newGrid.push(newRow);
        }
        return newGrid;
    };

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

    useEffect(() => {
        const newGrid = createGrid();
        placeMines(newGrid);
        calculateAdjacentMines(newGrid);
        setGrid(newGrid);
        setMinesLeft(totalMines);
    }, []);

    const handleCellClick = (row, col) => {
        let newGrid = [...grid];
        let cell = newGrid[row][col];
        if (cell.revealed || cell.flagged) return;

        cell.revealed = true;

        if (cell.mine) {
            alert("¡Boom! Has perdido.");
            revealMines(newGrid);
        } else {
            if (cell.adjacentMines === 0) {
                revealAdjacentCells(newGrid, row, col);
            }
        }
        setGrid(newGrid);
    };

    const revealAdjacentCells = (grid, row, col) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    if (!grid[newRow][newCol].revealed && !grid[newRow][newCol].mine) {
                        grid[newRow][newCol].revealed = true;
                        if (grid[newRow][newCol].adjacentMines === 0) {
                            revealAdjacentCells(grid, newRow, newCol);
                        }
                    }
                }
            }
        }
    };

    const revealMines = (grid) => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (grid[row][col].mine) {
                    grid[row][col].revealed = true;
                }
            }
        }
    };

    const resetGame = () => {
        const newGrid = createGrid();
        placeMines(newGrid);
        calculateAdjacentMines(newGrid);
        setGrid(newGrid);
        setMinesLeft(totalMines);
    };

    return (
        <div>
            <h1>BuscaMinas</h1>
            <div className="game-info">
                <div className="counter">{minesLeft}</div>
                <button className="reset-button" onClick={resetGame}>
                    Reiniciar
                </button>
            </div>
            <div
                className="grid-container"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
            >
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            className={`cell ${cell.revealed ? "revealed" : ""}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            {cell.revealed && (cell.mine ? "💣" : cell.adjacentMines > 0 ? cell.adjacentMines : "")}
                        </button>
                    ))
                )}
            </div>
            <HomeMenuButton screenChanger={screenChanger} />
        </div>
    );
}

export default BuscaMinas;
