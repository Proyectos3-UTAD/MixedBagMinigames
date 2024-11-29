import React from "react";
import { ReactElement } from "react";
import SnakeHead from "./SnakeHead.tsx";
import SnakeBody from "./SnakeBody.tsx";
import Fruit from "../fruits/Fruit.tsx";
import Position from "../board/Position.ts";
import Directions from "../../../common/constants/Directions.js";
class SnakePartPosition {
	private _position: string;
	private _direction: string;
	private readonly _index: number;

	constructor(position: string, index: number, direction?: string) {
		this._position = position;
		this._index = index;
		this._direction = direction;
	}

	set position(position: string) {
		this._position = position;
	}

	set direction(direction: string) {
		this._direction = direction;
	}

	get position(): string {
		return this._position;
	}

	get snakePart(): ReactElement {

		let dir: string;

		switch (this._direction) {
			case Directions.DOWN:
				dir = "snake-down";
				break;
			case Directions.UP:
				dir = "snake-up";
				break;
			case Directions.LEFT:
				dir = "snake-left";
				break;
			case Directions.RIGHT:
				dir = "snake-right";
				break;
		}
		if (this._index === 0) {
			return <SnakeHead direction={dir} />;
		}
		else {
			return <SnakeBody direction={dir} />
		}
	}

	get direction(): string {
		return this._direction;
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
	private _size: number;

	constructor(headPosition: string) {

		this._snakeBody = new Array<SnakePartPosition>();

		this._growthLeft = 0;

		this._collided = false;

		this._size = 0;

		this._createHead(headPosition);

	}

	_createHead(headPosition: string) {
		this._snakeBody.push(new SnakePartPosition(headPosition, this._size, Directions.DOWN));
		this._size++;
	}

	addGrowth(): void {
		this._growthLeft += 1;
	}

	grow(bodyPartPosition: string, direction: string): void {
		this._snakeBody.push(new SnakePartPosition(bodyPartPosition, this._size, direction));
		this._size++;
		this._growthLeft--;
	}

	moveSnake(inputDirection) {

		let nextPos: Position = Position.parsePositionFromString(this._snakeBody[0].position).getNextPosition(inputDirection);

		let nextDir: string = inputDirection;

		let tempPos: Position;

		let tempDir: string;

		this._snakeBody.forEach((bodyPart) => {

			tempPos = Position.parsePositionFromString(bodyPart.position);
			tempDir = bodyPart.direction;
			bodyPart.position = nextPos.toString();
			bodyPart.direction = nextDir;
			nextPos = tempPos;
			nextDir = tempDir;

		});

		if (this.growthLeft) {

			this.grow(nextPos.toString(), nextDir);

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