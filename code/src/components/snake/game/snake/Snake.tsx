import {ReactElement} from "react";
import SnakeHead from "./SnakeHead.tsx";
import SnakeBody from "./SnakeBody.tsx";
import Fruit from "../fruits/Fruit.tsx";
import Position from "../board/Position.ts";

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
/**
 * Snake class.
 */
class Snake {

    private readonly _snakeBody: Array<SnakePartPosition>;
    private _growthLeft: number;
    private _collided: boolean;
    private _positionToClean: string;

    constructor(headPosition: string) {

        this._snakeBody = new Array<SnakePartPosition>();

        this._growthLeft = 0;

        this._collided = false;

        this._createHead(headPosition);

    }

    _createHead(headPosition: string) {
        this._snakeBody.push(new SnakePartPosition(<SnakeHead/>, headPosition));
    }

    addGrowth(): void {
        this._growthLeft += 1;
    }

    grow(bodyPartPosition: string): void {
        this._snakeBody.push(new SnakePartPosition(<SnakeBody/>, bodyPartPosition));
        this._growthLeft--;
    }

    moveSnake(inputDirection) {

        let nextPos: Position = Position.parsePositionFromString(this._snakeBody[0].position).getNextPosition(inputDirection);

        let tempPos: Position;

        this._snakeBody.forEach((bodyPart) => {

            tempPos = Position.parsePositionFromString(bodyPart.position);
            bodyPart.position = nextPos.toString();
            nextPos = tempPos;

        });

        if (this.growthLeft) {

            this.grow(nextPos.toString());

        } else {
            this.positionToClean = nextPos.toString();
        }
    }

    get positionToClean(): string {
        return this._positionToClean;
    }

    set positionToClean(value: string) {
        this._positionToClean = value;
    }

    placeSnake(boardContents: Map<string, ReactElement>): void {

        let isHead = true;

        if (this.positionToClean !== null) {

            boardContents.set(this.positionToClean, null);
            this.positionToClean = null;

        }

        this._snakeBody.forEach((bodyPart) => {

            if (isHead) {

                if (boardContents.has(bodyPart.position)) {

                    const tileContents = boardContents.get(bodyPart.position);

                    if (tileContents?.type === Fruit) {

                        this.addGrowth();

                    } else if (tileContents) {

                        this.collided = true;

                    }

                } else {

                    this.collided = true;

                }


                isHead = false;

            }

            boardContents.set(bodyPart.position, bodyPart.snakePart);

        })

    }

    get collided(): boolean {
        return this._collided;
    }

    set collided(value: boolean) {
        this._collided = value;
    }

    get growthLeft(): number {
        return this._growthLeft;
    }
}

export default Snake;