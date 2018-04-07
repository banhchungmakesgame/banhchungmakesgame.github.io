var TH = {};

TH.Boot = function(game)
{

};

TH.Boot.prototype = 
{
    init: function()
    {
        this.input.maxPointers = 1;
        game.time.advancedTiming = true;
        //this.scale.pageAlignHorizontally = true;
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
        var title = game.add.image(game.world.centerX, 200, 'title');
        title.anchor.set(0.5);
        this.state.start('Preloader');
    }
};