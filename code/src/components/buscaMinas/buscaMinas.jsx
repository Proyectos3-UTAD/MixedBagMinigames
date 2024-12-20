import React, { useState, useEffect } from "react";
import HomeMenuButton from "../common/HomeMenuButton";
import '../../styles/buscaMinas/buscaMinas.css';


function BuscaMinas({ screenChanger }) {
    const [rows, setRows] = useState(4);
    const [cols, setCols] = useState(4);
    const [totalMines, setTotalMines] = useState(2);
    const [grid, setGrid] = useState([]);
    const [minesLeft, setMinesLeft] = useState(totalMines);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // Tiempo inicial para el nivel
    const [currentLevel, setCurrentLevel] = useState(1); // Nivel actual

    const createGrid = () => {
        let newGrid = [];
        for (let row = 0; row < rows; row++) {
            let newRow = [];
            for (let col = 0; col < cols; col++) {
                newRow.push({
                    revealed: false,
                    mine: false,
                    flagged: false,
                    adjacentMines: 0,
                    status: "", // "correct" o "incorrect" para indicar si la casilla está marcada correctamente
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

    const initializeGame = () => {
        const newGrid = createGrid();
        placeMines(newGrid);
        calculateAdjacentMines(newGrid);
        setGrid(newGrid);
        setMinesLeft(totalMines);
        setGameOver(false);
        setGameWon(false);
        setTimeLeft(60 * currentLevel); // Ajusta el tiempo según el nivel
    };

    useEffect(() => {
        initializeGame();
    }, [rows, cols, totalMines, currentLevel]);

    useEffect(() => {
        if (timeLeft <= 0) {
            setGameOver(true);
            alert("¡Tiempo agotado! Has perdido.");
        }

        if (!gameOver && !gameWon) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft, gameOver, gameWon]);

    const handleCellClick = (row, col) => {
        if (gameOver || gameWon) return;

        let newGrid = [...grid];
        let cell = newGrid[row][col];

        if (cell.revealed) return;

        cell.revealed = true;

        if (cell.mine) {
            setGameOver(true);
            revealMines(newGrid);
            alert("¡Boom! Has perdido.");
        } else {
            if (cell.adjacentMines === 0) {
                revealAdjacentCells(newGrid, row, col);
            }
        }

        setGrid(newGrid);

        if (checkWin(newGrid)) {
            setGameWon(true);
        }
    };

    const handleCellRightClick = (e, row, col) => {
        e.preventDefault();

        if (gameOver || gameWon) return;

        let newGrid = [...grid];
        let cell = newGrid[row][col];

        if (cell.revealed) return;

        cell.flagged = !cell.flagged;

        if (cell.flagged) {
            if (cell.mine) {
                setTimeLeft((prev) => prev + 5); // Suma tiempo si acierta
                cell.status = "correct";
            } else {
                setTimeLeft((prev) => prev - 5); // Resta tiempo si se equivoca
                cell.status = "incorrect";
            }
        } else {
            cell.status = "";
        }

        setGrid(newGrid);
    };

    const revealAdjacentCells = (grid, row, col) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < cols &&
                    !grid[newRow][newCol].revealed &&
                    !grid[newRow][newCol].mine
                ) {
                    grid[newRow][newCol].revealed = true;
                    if (grid[newRow][newCol].adjacentMines === 0) {
                        revealAdjacentCells(grid, newRow, newCol);
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
        setGrid(grid);
    };

    const checkWin = (grid) => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (!grid[row][col].mine && !grid[row][col].revealed) {
                    return false;
                }
            }
        }
        return true;
    };

    const resetGame = () => {
        setRows(4);
        setCols(4);
        setTotalMines(2);
        setCurrentLevel(1);
        initializeGame();
    };

    const nextLevel = () => {
        if (currentLevel < 3) {
            setCurrentLevel((prev) => prev + 1);
            if (currentLevel === 1) {
                setRows(6);
                setCols(6);
                setTotalMines(4);
                setTimeLeft(90);
            } else if (currentLevel === 2) {
                setRows(12);
                setCols(12);
                setTotalMines(12); // Triple de minas que el nivel 2
                setTimeLeft(120);
            }
        } else {
            alert("¡Has completado todos los niveles!");
            resetGame();
        }
    };

    return (
        <div id="mainFrameMine">
            <h1 id="mineTitle">BuscaMinas</h1>
            <div className="game-info">
                <div className="counter">Minas restantes: {minesLeft}</div>
                <div className="timer">Tiempo restante: {timeLeft} s</div>
                <div className="level">Nivel: {currentLevel}</div>
                <button className="reset-button" onClick={resetGame}>
                    Reiniciar
                </button>
            </div>
            <div
                className="grid-container"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`
                }}
            >
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            className={`cell ${
                                cell.revealed
                                    ? "revealed"
                                    : cell.status === "correct"
                                    ? "correct"
                                    : cell.status === "incorrect"
                                    ? "incorrect"
                                    : ""
                            }`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                        >
                            {cell.flagged
                                ? "🚩"
                                : cell.revealed &&
                                  (cell.mine
                                      ? "💣"
                                      : cell.adjacentMines > 0
                                      ? cell.adjacentMines
                                      : "")}
                        </button>
                    ))
                )}
            </div>
            {gameWon && (
                <div className="game-end">
                    <p>¡Has ganado el nivel {currentLevel}!</p>
                    {currentLevel < 3 ? (
                        <button onClick={nextLevel}>Siguiente Nivel</button>
                    ) : (
                        <button onClick={resetGame}>Reiniciar</button>
                    )}
                </div>
            )}
            {gameOver && (
                <div className="game-end">
                    <p>¡Has perdido!</p>
                    <button onClick={resetGame}>Reiniciar</button>
                </div>
            )}
            <HomeMenuButton />
        </div>
    );
}

export default BuscaMinas;
