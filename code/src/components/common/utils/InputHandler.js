import Directions from "../constants/Directions";


class InputHandler {

    constructor(directionChanger) {
        this.directionChanger = directionChanger;
    }

    onKeyDown = (event) => {
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

export default InputHandler;