
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
        this.preloaderBar = this.add.sprite(0, 15, 'preloaderBar');
        this.load.setPreloadSprite(this.preloaderBar, 0);
    }, 
    create: function()
    {      
        //this.state.start('Gameplay');
    }
};
