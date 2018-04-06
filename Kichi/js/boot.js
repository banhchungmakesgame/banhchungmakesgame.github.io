var TH = {};

TH.Boot = function(game)
{

};

TH.Boot.prototype = 
{
    init: function()
    {
        this.input.maxPointers = 1;
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