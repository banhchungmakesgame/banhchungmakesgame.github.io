

TH.Preloader = function(){
    
};

TH.Preloader.prototype = 
{
    init: function()
    {
    },
    preload: function()
    {
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'bg');
        bg.anchor.set(0.5);
        var title = game.add.image(game.world.centerX, 450, 'title');
        title.anchor.set(0.5);
        var preloaderBar = this.add.sprite(game.world.centerX, game.world.centerY, 'preloaderBar');
        preloaderBar.scale.setTo(1, 1);
        preloaderBar.anchor.set(0, 0.5);
        preloaderBar.x = game.world.centerX - preloaderBar.width / 2;
        this.load.setPreloadSprite(preloaderBar);
        this.load.video('myway', 'assets/myway.mp4');
        this.load.image('play', 'assets/play.png');
        this.load.image('gun', 'assets/CANON.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('item1', 'assets/item1.png');
        this.load.image('item2', 'assets/item2.png');
        this.load.image('item3', 'assets/item3.png');
        this.load.image('item4', 'assets/item4.png');

        this.load.image('item1_open', 'assets/item1_open.png');
        this.load.image('item2_open', 'assets/item2_open.png');
        this.load.image('item3_open', 'assets/item3_open.png');
        this.load.image('item4_open', 'assets/item4_open.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('bomb_open', 'assets/bomb_open.png');
        this.load.image('fb_login', 'assets/fb_login.png');     
        this.load.image('rules', 'assets/rules.png');
        this.load.image('gift', 'assets/gift.png');
        this.load.image('score_bg', 'assets/score_bg.png');
        this.load.bitmapFont('marvin', 'fonts/Marvin/Marvin_0.png', 'fonts/Marvin/Marvin.xml');
        this.load.bitmapFont('spaceComics', 'fonts/SpaceComics_0.png', 'fonts/SpaceComics.xml');
        this.load.image('ingame_bg', 'assets/ingame_bg.png');
        this.load.image('top_bar', 'assets/top_bar.png');
        this.load.image('live', 'assets/live.png');
        this.load.spritesheet('fire', 'assets/fire.png', 256, 256, 5);

        this.load.image('avatar', 'assets/avatar.png');
        this.load.image('congrat', 'assets/congrat.png');
        this.load.image('footer', 'assets/footer.png');
        this.load.image('get_code', 'assets/get_code.png');
        this.load.image('score_bg', 'assets/congrat.png');
        this.load.image('share_score_fb', 'assets/share_score_facebook.png');
        this.load.image('share_with_friend', 'assets/share_with_friend.png');
        this.load.image('sound_off', 'assets/sound_off.png');
        this.load.image('sound_on', 'assets/sound_on.png');
        this.load.image('result_bg', 'assets/result_bg.png');
        this.load.image('play_again', 'assets/play_again.png');
        this.load.image('khampha_uudai', 'assets/khampha_uudai.png');
    }, 
    create: function()
    {  
        game.state.start("MainMenu");
    }    
};


