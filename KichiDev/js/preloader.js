

TH.Preloader = function(game){
    
};

TH.Preloader.prototype = 
{
    init: function()
    {
    },
    preload: function()
    {
        var preloaderBar = this.add.sprite(game.world.centerX, game.world.centerY, 'preloaderBar');
        preloaderBar.scale.setTo(0.75, 0.75);
        preloaderBar.anchor.set(0, 0.5);
        preloaderBar.x = game.world.centerX - preloaderBar.width / 2;
        this.load.setPreloadSprite(preloaderBar);
        this.load.video('myway', 'assets/myway.mp4');
        this.load.image('play', 'assets/play.png');
        this.load.image('gun', 'assets/gun.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('ingame_bg', 'assets/ingame.jpg');
        this.load.image('item1', 'assets/item1.png');
        this.load.image('bomb', 'assets/bomb.png');
    }, 
    create: function()
    {      
        game.state.start("MainMenu");
    }    
};


