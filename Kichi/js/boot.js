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
    }, 
    create: function()
    {        
        game.stage.backgroundColor = '#A5C'
        this.state.start('Preloader');
    }
};