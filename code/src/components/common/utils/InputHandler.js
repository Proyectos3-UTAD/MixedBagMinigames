import Directions from "../constants/Directions";

/**
 * Changes certain keystrokes into directions for better abstraction.
 */
class InputHandler {
    constructor(directionChanger) {
        this.directionChanger = directionChanger;
        /**
         * On key down custom event that processes directions
         * @param event The event of a keyStroke.
         */
        this.onKeyDown = (event) => {
            switch (event.key.toLowerCase()) {
                case "w":
                case "arrowup":
                    this.directionChanger(Directions.UP);
                    break;

                case "s":
                case "arrowdown":
                    this.directionChanger(Directions.DOWN);
                    break;

                case "d":
                case "arrowright":
                    this.directionChanger(Directions.RIGHT);
                    break;

                case "a":
                case "arrowleft":
                    this.directionChanger(Directions.LEFT);
                    break;

                default:
                    break;
            }
        }
    }
}

export default InputHandler;