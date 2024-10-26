/**
 * Settings of the board dimensions
 */
class BoardDimensions {

    private readonly _width: number;
    private readonly _height: number;

    /**
     * Definition of the board dimensions
     * @param width Width of the board
     * @param height Height of the board
     */
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    /**
     * The _width of the board
     */
    get width(): number {
        return this._width;
    }

    /**
     * The _height of the board
     */
    get height(): number {
        return this._height;
    }

    /**
     * The squares of the board in total
     */
    get totalSquares(): number {
        return this.height * this.width;
    }

}

export default BoardDimensions;