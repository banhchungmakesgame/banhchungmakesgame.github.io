var TH = {};

TH.Boot = function(game)
{

};

TH.Boot.prototype = 
{
    init: function()
    {
        this.input.maxPointers = 1;
        this.scale.scaleMode= Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
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