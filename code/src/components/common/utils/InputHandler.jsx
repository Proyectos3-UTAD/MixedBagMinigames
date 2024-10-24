import React, {useEffect} from 'react';
import Directions from "../constants/Directions";

function InputHandler({directionChanger}) {

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "w":
            case "W":
            case "ArrowUp":
                directionChanger(Directions.UP)
                break;

            case "s":
            case "S":
            case "ArrowDown":
                directionChanger(Directions.DOWN)
                break;

            case "d":
            case "D":
            case "ArrowRight":
                directionChanger(Directions.RIGHT)
                break;

            case "a":
            case "A":
            case "ArrowLeft":
                directionChanger(Directions.LEFT)
                break;
        }
    }

    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown, true);

    }, []);

    return (
        <>
        </>
    );

}

export default InputHandler;