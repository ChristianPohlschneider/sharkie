class CoinBar extends MovableObject {
    wallet = 0;
    score = 10;
    world;

    IMAGES_COINBAR = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png',
    ];

    constructor() {
        super();
        this.x = 20;
        this.y = 100;
        this.height = 60;
        this.width = 200;
        this.loadImage('img/4. Marcadores/green/Coin/0_  copia 4.png');
        this.loadImages(this.IMAGES_COINBAR);
    }

    /**
     * Updates the visual representation of the coin wallet based on the current number of coins.
     * 
     * This method performs the following:
     * - If `coinsInWallet` is less than 100, it calculates an index by dividing the coin amount by 20
     *   and rounding down, then loads the corresponding coin bar image from `IMAGES_COINBAR`.
     * - If `coinsInWallet` is greater than 80 or equal to 100, it loads the last image in the coin bar (`IMAGES_COINBAR[5]`).
     * 
     * @method setWalletAmount
     * @param {number} coinsInWallet - The current number of coins in the wallet.
     */
    setWalletAmount(coinsInWallet) {
        if (coinsInWallet < 100) {
            let absoluteCoinAmount = Math.floor(coinsInWallet / 20);
            this.loadImage(this.IMAGES_COINBAR[absoluteCoinAmount])
        } else if (coinsInWallet > 80 || coinsInWallet == 100) {
            this.loadImage(this.IMAGES_COINBAR[5])
        }
    }

    /**
     * Updates the character's wallet by adding or subtracting a coin value.
     * 
     * This method increments `wallet` by the given `coinValue`. If the result is negative,
     * the wallet is clamped to 0 to prevent negative coin counts.
     * 
     * @method coinCount
     * @param {number} coinValue - The value of coins to add (positive) or subtract (negative) from the wallet.
     */
    coinCount(coinValue) {
        this.wallet += coinValue;
        if (this.wallet < 0) {
            this.wallet = 0;
        }
    }
}