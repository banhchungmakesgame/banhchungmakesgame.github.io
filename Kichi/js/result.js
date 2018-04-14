

TH.Result = function(){
    
};
var avatar1, avatar2, avatar3;
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
        var request = {};
        request["eventKey"] = "KICHI_HIGHSCORE_LB";
        request["HIGHSCORE"] = TH.score
        gamesparks.sendWithData("LogEventRequest", request, function(response){});

        var bg = game.add.image(game.world.centerX, game.world.centerY, 'result_bg');
        bg.anchor.set(0.5);
        var congrat = game.add.image(game.world.centerX, 230, 'congrat');
        congrat.anchor.set(0.5);
        var score_bg = game.add.image(game.world.centerX, 520, 'score_bg');
        score_bg.anchor.set(0.5);
        var scoreText = game.add.bitmapText(game.world.centerX, 50, 'marvin', TH.score, 350);
        scoreText.anchor.set(0.5);
        scoreText.x = score_bg.x;
        scoreText.y = score_bg.y-50;

        if(!TH.isPlayAgain)
        {
            var shareWithFriend = game.add.image(game.world.centerX, game.world.centerY - 50, 'share_with_friend');
            shareWithFriend.anchor.set(0.5);
            shareWithFriend.inputEnabled = true;
            shareWithFriend.events.onInputDown.add(this.onClickShareWF, this);

            var shareOnFB = game.add.image(game.world.centerX, game.world.centerY + 135, 'share_score_fb');
            shareOnFB.anchor.set(0.5);
            shareOnFB.inputEnabled = true;
            shareOnFB.events.onInputDown.add(this.onClickShareOnFB, this);            

            var nhanqua = game.add.image(game.world.centerX, game.world.centerY + 320, 'get_code');
            nhanqua.anchor.set(0.5);
            nhanqua.inputEnabled = true;
            nhanqua.events.onInputDown.add(this.onClickNhanQua, this);
        }
        else
        {
            var shareOnFB = game.add.image(game.world.centerX, game.world.centerY, 'share_score_fb');
            shareOnFB.anchor.set(0.5);
            shareOnFB.inputEnabled = true;
            shareOnFB.events.onInputDown.add(this.onClickShareOnFB, this);            

            var nhanqua = game.add.image(game.world.centerX, game.world.centerY + 215, 'get_code');
            nhanqua.anchor.set(0.5);
            nhanqua.inputEnabled = true;
            nhanqua.events.onInputDown.add(this.onClickNhanQua, this);
        }

        var footer = game.add.image(game.world.centerX, game.world.height, 'footer');
        footer.anchor.set(0.5);
        footer.y -= footer.height/2;
        var avatar1 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar1.anchor.set(0.5);
        avatar1.x = footer.centerX - 285;
        avatar1.y = footer.centerY - 10;

        var avatar2 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar2.anchor.set(0.5);
        avatar2.x = footer.centerX+10;
        avatar2.y = footer.centerY - 10;

        var avatar3 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar3.anchor.set(0.5);
        avatar3.x = footer.centerX + 295;
        avatar3.y = footer.centerY - 10;
    },
    onClickShareOnFB: function()
    {
        FB.ui({
            method: 'share',
            href: 'https://zzvutienhung.github.io/Kichi/',
            display: 'popup'
          }, function(response){});
    },
    onClickShareWF: function()
    {
        FB.ui({
            method: 'share',
            href: 'https://zzvutienhung.github.io/Kichi/',
            display: 'popup'
          }, function(response){
            TH.isGameOver = false;
            game.state.start('Gameplay');
          });
    },
    onClickNhanQua: function()
    {
        var request = {};
        request["eventKey"] = "KICHI_HIGHSCORE_LB";
        request["HIGHSCORE"] = TH.score
        gamesparks.sendWithData("LogEventRequest", request, function(response){
            console.log('response ' + response);
        });
    }
};


