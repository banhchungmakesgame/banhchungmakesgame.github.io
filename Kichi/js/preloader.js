

TH.Preloader = function(game){
    
};

TH.Preloader.prototype = 
{
    init: function()
    {
    },
    preload: function()
    {
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'bg');
        bg.anchor.set(0.5);
        var title = game.add.image(game.world.centerX, 200, 'title');
        title.anchor.set(0.5);
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
        this.load.image('fb_login', 'assets/fb_login.png');     
        this.load.image('rules', 'assets/rules.png');
        this.load.image('gift', 'assets/gift.png');
        this.load.image('score_bg', 'assets/score_bg.png');
        this.load.image('button', 'assets/button.png');
    }, 
    create: function()
    {             
        game.state.start("MainMenu");
    }    
};


