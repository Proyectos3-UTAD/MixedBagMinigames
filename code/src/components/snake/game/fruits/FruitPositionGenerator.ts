/**
 * Modules
 */
import {ReactElement} from "react";


/**
 * Generates a position for the fruit.
 * @param boardContents The contents of the board (to avoid overlap)
 * @returns A position in which a fruit can be spawned freely
 * @constructor
 */
function FruitPositionGenerator(boardContents: Map<string, ReactElement>): string {

    const availablePositions = [];


    boardContents.forEach((tileContents, key) => {
        if (tileContents === null) {
            availablePositions.push(key);
        }
    })

    return availablePositions[(Math.floor(Math.random() * availablePositions.length))];

}

export default FruitPositionGenerator;