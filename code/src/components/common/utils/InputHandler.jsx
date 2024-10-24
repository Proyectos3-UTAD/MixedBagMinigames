import React, {useEffect} from 'react';
import Directions from "../constants/Directions";

function InputHandler({directionChanger, content}) {

    const handleKeyDown = (event) => {
        switch (event.key.toLowerCase()) {
            case "w":
            case "arrowup":
                directionChanger(Directions.UP);
                break;

            case "s":
            case "arrowdown":
                directionChanger(Directions.DOWN);
                break;

            case "d":
            case "arrowright":
                directionChanger(Directions.RIGHT);
                break;

            case "a":
            case "arrowleft":
                directionChanger(Directions.LEFT);
                break;

            default:
                break;
        }
    }

    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown);

    }, []);

    return (
        <>
            {content}
        </>
    );

}

export default InputHandler;