import {ReactElement} from "react";
import SnakeHead from "./SnakeHead.tsx";

class SnakePartPosition {

    private readonly _snakePart: ReactElement;
    private _position: string;

    constructor(snakePart: ReactElement, position: string) {
        this._snakePart = snakePart;
        this._position = position;
    }

    set position(position: string) {
        this._position = position;
    }

    get position(): string {
        return this._position;
    }

    get snakePart(): ReactElement {
        return this._snakePart
    }
}

class Snake {

    private readonly _snakeBody: Array<SnakePartPosition>;
    private growthLeft: number;

    constructor(headPosition: string) {
        this._snakeBody = new Array<SnakePartPosition>();
        this.growthLeft = 0;
        this._createHead(headPosition);
    }

    _createHead(headPosition: string) {
        this._snakeBody.push(new SnakePartPosition(<SnakeHead/>, headPosition));
    }

}

export default Snake;