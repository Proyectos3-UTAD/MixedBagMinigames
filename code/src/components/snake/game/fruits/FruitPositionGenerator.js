import Position from "../board/Position";

function FruitPositionGenerator(boardContents, boardDimensions) {

    const availablePositions = [];

    for (let y = 0; y < boardDimensions.height; y++) {
        for (let x = 0; x < boardDimensions.width; x++) {
            let positionName = Position.getStringNotation(x, y);
            if (!(boardContents?.[`${positionName}`])) {
                availablePositions.push([`${positionName}`]);
            }
        }
    }

    return availablePositions[(Math.floor(Math.random() * availablePositions.length))][0];

}

export default FruitPositionGenerator;