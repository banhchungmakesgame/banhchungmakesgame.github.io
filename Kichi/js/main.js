   
    var game = new Phaser.Game(480, 800, Phaser.AUTO, '');

    game.state.add('Boot', TH.Boot);
    game.state.add('Preloader', TH.Preloader);
    game.state.add('MainMenu', TH.MainMenu);
    game.state.add('Gameplay', TH.Gameplay);
    game.state.add('Result', TH.Result);

    game.state.start('Boot');