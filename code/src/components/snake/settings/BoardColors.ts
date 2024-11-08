/**
 * Class storing the settings of the board colors
 */
class BoardColors {

    private readonly _lightSquareClass: string;
    private readonly _darkSquareClass: string;

    /**
     * Constructos of the colors of the board.
     * @param lightSquareClass The lighter tone of the squares
     * @param darkSquareClass The darker tone of the squares
     */
    constructor(lightSquareClass: string, darkSquareClass: string) {
        this._lightSquareClass = lightSquareClass;
        this._darkSquareClass = darkSquareClass;
    }

    /**
     * Gets the CSS class of the light squares
     */
    get lightSquareClass(): string {
        return this._lightSquareClass;
    }

    /**
     * Gets the CSS class of the darker squares
     */
    get darkSquareClass(): string {
        return this._darkSquareClass;
    }

}

export default BoardColors;