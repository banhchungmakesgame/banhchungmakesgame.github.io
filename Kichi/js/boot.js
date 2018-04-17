var TH = {
    score : 0,
    achievement: [],
    hashKey: '',
    live: 3,
    isGameOver: false,
    isPlayAgain: false,
    fbAccessToken : null,
    fbUserName : null,
    userId : '',
    sound: true
};

TH.Boot = function()
{
    
};

TH.Boot.prototype = 
{
    init: function()
    {
        game.load.crossOrigin = 'anonymous';
        this.input.maxPointers = 1;
        game.time.advancedTiming = true;
        this.scale.pageAlignHorizontally = true;
        // Maintain aspect ratio
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;      
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMaximum();
        game.scale.refresh();
        
        gamesparks = new GameSparks();
        gamesparks.initPreview({
            key: "o352142KYoc7",
            secret: "qfwtsFWJpDFfoePr2ddLPtu28447lcf3",
            onNonce: this.onNonce,
            onInit: this.onInit,
            onMessage: this.onMessage,
            logger: console.log,
        });
    },
    preload: function()
    {
        this.load.image('preloaderBar', 'assets/progress.png');
        this.load.image('loading', 'assets/loading.png');
        this.load.image('pre_title', 'assets/pre_title.png');
    }, 
    create: function()
    {    
        game.stage.backgroundColor = 'f24a41';
        game.state.start('Preloader');
    },
    onNonce: function(nonce)
    {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(nonce, "qfwtsFWJpDFfoePr2ddLPtu28447lcf3"));
    },
    onInit: function()
    {
        console.log("Initialized");
    },
    onMessage: function(message)
    {
        console.log(JSON.stringify(message));
    }
};