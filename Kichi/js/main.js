var game = new Phaser.Game(750, 1334, Phaser.AUTO, '');

game.state.add('Boot', TH.Boot);
game.state.add('Preloader', TH.Preloader);
game.state.add('Gameplay', TH.Gameplay);
game.state.add('Result', TH.Result);

game.state.start('Boot');
