import HomeMenuButton from "../common/HomeMenuButton";

function BuscaMinas({screenChanger}) {
  // Función para crear la cuadrícula
    const createGrid = () => {
        let newGrid = [];
        for (let row = 0; row < rows; row++) {
        let newRow = [];
        for (let col = 0; col < cols; col++) {
            newRow.push({
            revealed: false,
            mine: false,
            adjacentMines: 0
            });
        }
        newGrid.push(newRow);
        }
        return newGrid;
    };
    // Función para colocar las minas aleatoriamente
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
    return (
        <div>
            <h1>BuscaMinas</h1>
            <p>WIP</p>
            <HomeMenuButton screenChanger={screenChanger}/>
            
        </div>
    );
}

export default BuscaMinas;