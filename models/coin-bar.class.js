class CoinBar extends MovableObject {
    wallet = 0;
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


    setWalletAmount(coinsInWallet) {
        if (coinsInWallet < 100) {
            let absoluteCoinAmount = Math.floor(coinsInWallet / 20);
            this.loadImage(this.IMAGES_COINBAR[absoluteCoinAmount])
        } else if (coinsInWallet > 80 || coinsInWallet == 100) {
            this.loadImage(this.IMAGES_COINBAR[5])
        }
    }

    coinCount(coinValue) {
        this.wallet += coinValue;
        if (this.wallet < 0) {
            this.wallet = 0;
        }
    }
}