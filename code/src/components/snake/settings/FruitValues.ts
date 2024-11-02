/**
 * Settings of the fruits in the game
 */
class FruitValues {

    private readonly _fruitAmount: number;

    /**
     * Fruit values and behavior
     * @param fruitAmount Amount of fruits on the game
     */
    constructor(fruitAmount: number) {
        this._fruitAmount = fruitAmount;
    }

    /**
     * Amount of fruits on the game at once
     */
    get fruitAmount(): number {
        return this._fruitAmount;
    }

}

export default FruitValues;