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
    return (
        <div>
            <h1>BuscaMinas</h1>
            <p>WIP</p>
            <HomeMenuButton screenChanger={screenChanger}/>
            
        </div>
    );
}

export default BuscaMinas;