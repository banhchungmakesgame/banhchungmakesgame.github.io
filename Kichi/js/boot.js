var TH = {
    score : 0,
    live: 3,
    fbAccessToken : null,
    fbUserName : null,
};

TH.Boot = function()
{
    
};

TH.Boot.prototype = 
{
    init: function()
    {
        this.input.maxPointers = 1;
        game.time.advancedTiming = true;
        this.scale.pageAlignHorizontally = true;
        // Maintain aspect ratio
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;      
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
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
        this.load.image('bg', 'assets/bg.png');
        this.load.image('title', 'assets/title.png');
    }, 
    create: function()
    {    
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'bg');
        bg.anchor.set(0.5);
        var title = game.add.image(game.world.centerX, 650, 'title');
        title.anchor.set(0.5);
        this.state.start('Preloader');
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