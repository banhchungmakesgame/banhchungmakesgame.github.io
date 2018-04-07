TH.MainMenu = function(game){
    
};

function onClickOnBtnPlay()
{
    this.state.start('Gameplay');
}

TH.MainMenu.prototype = 
{
    init: function()
    {
    },
    preload: function()
    {
    }, 
    create: function()
    {      
        var style = { font: "65px Tahoma", fill: "#ff0044", align: "center" };
        var title1 = game.add.text(game.world.centerX, 45, 'KICHI', style);
        title1.anchor.set(0.5);
        var title2 = game.add.text(game.world.centerX, 135, 'LẨU CHIẾN', style);
        title2.anchor.set(0.5);

        var playButton = this.add.image(game.world.centerX, game.world.centerY, 'play');
        playButton.anchor.set(0.5);
        playButton.scale.setTo(0.5, 0.5);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(onClickOnBtnPlay, this);
    }    
};