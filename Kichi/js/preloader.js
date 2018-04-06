
TH.Preloader = function(game){
    this.preloaderBar = null;
};

TH.Preloader.prototype = 
{
    init: function()
    {
        
    },
    preload: function()
    {
        this.preloaderBar = this.add.sprite(game.world.centerX, 600, 'preloaderBar');
        this.preloaderBar.scale.setTo(0.75, 0.75);
        this.preloaderBar.anchor.set(0.5, 0.5);
        this.load.setPreloadSprite(this.preloaderBar);
        this.load.video('myway', 'assets/myway.mp4');
        this.load.video('myway', 'assets/myway1.mp4');
        this.load.video('myway', 'assets/myway2.mp4');
        this.load.video('myway', 'assets/myway3.mp4');
        this.load.video('myway', 'assets/myway4.mp4');
        this.load.video('myway', 'assets/myway5.mp4');
        this.load.video('myway', 'assets/myway6.mp4');
        this.load.video('myway', 'assets/myway7.mp4');
        this.load.video('myway', 'assets/myway8.mp4');
        this.load.video('myway', 'assets/myway9.mp4');
        this.load.video('myway', 'assets/myway10.mp4');
        this.load.video('myway', 'assets/myway11.mp4');
    }, 
    create: function()
    {      
        //this.state.start('Gameplay');
    }
};
