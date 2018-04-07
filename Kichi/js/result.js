

TH.Result = function(game){
    
};

TH.Result.prototype = 
{
    init: function()
    {
    },
    preload: function()
    {
    }, 
    create: function()
    {      
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'bg');
        bg.anchor.set(0.5);
        var style = { font: "65px Tahoma", fill: "#ff0044", align: "center" };
        var title1 = game.add.text(game.world.centerX, 45, 'Result', style);
    }    
};


