

TH.Result = function(){
    
};
var avatar1, avatar2, avatar3;
var highscore1, highscore2, highscore3;
var giftCodePopup, giftCodeText;
var dieukhoan, congratText;
var btnKhampha, btnChoiLai;
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
        gamesparks.sendWithData("LogEventRequest", request, function(response){            
        });

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
        avatar1 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar1.anchor.set(0.5);
        avatar1.x = footer.centerX - 285;
        avatar1.y = footer.centerY - 10;

        highscore1 = game.add.bitmapText(game.world.centerX, 50, 'marvin', '', 72);
        highscore1.anchor.set(0.5);
        highscore1.x = avatar1.x;
        highscore1.y = avatar1.y+125;
        highscore1.tint = 0x085282;

        avatar2 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar2.anchor.set(0.5);
        avatar2.x = footer.centerX+10;
        avatar2.y = footer.centerY - 10;
        highscore2 = game.add.bitmapText(game.world.centerX, 50, 'marvin', '', 72);
        highscore2.anchor.set(0.5);
        highscore2.x = avatar2.x;
        highscore2.y = avatar2.y+125;
        highscore2.tint = 0x085282;

        avatar3 = game.add.image(game.world.centerX, game.world.height, 'avatar');
        avatar3.anchor.set(0.5);
        avatar3.x = footer.centerX + 295;
        avatar3.y = footer.centerY - 10;  
        highscore3 = game.add.bitmapText(game.world.centerX, 50, 'marvin', '', 72);
        highscore3.anchor.set(0.5);
        highscore3.x = avatar3.x;
        highscore3.y = avatar3.y+125;      
        highscore3.tint = 0x085282;

        gamesparks.leaderboardDataRequest(null, 3, null, "KICHI_LB", 0, null, function(response){
            
            if(response && response.data && response.data.length > 0)
            {
                if(response.data[0])
                {
                    highscore1.setText(response.data[0].HIGHSCORE);
                    FB.api(
                        '/'+ response.data[0].externalIds.FB + '/picture',
                        'GET',
                        {},
                        function(response) {
                            loader = new Phaser.Loader(game);
                            loader.image('highscore1', response.url );
                            loader.atlasJSONHash('highscore', '/highscore' , '/highscoreAtlas' );
                            loader.onLoadComplete.addOnce(onLoaded);
                            loader.start();
                            onLoaded = function(){   
                                this.onLoadTextureDone(avatar1, 'highscore1');
                            }                            
                        }
                    );
                }
                if(response.data[1])
                {
                    highscore2.setText(response.data[1].HIGHSCORE);
                    FB.api(
                        '/'+ response.data[1].externalIds.FB + '/picture',
                        'GET',
                        {},
                        function(response) {
                            game.load.image('highscore2', response.url);
                            avatar2.loadTexture('highscore2');
                        }
                    );
                }

                if(response.data[2])
                {
                    highscore3.setText(response.data[2].HIGHSCORE);
                    FB.api(
                        '/'+ response.data[2].externalIds.FB + '/picture',
                        'GET',
                        {},
                        function(response) {
                            game.load.image('highscore3', response.url);
                            avatar3.loadTexture('highscore3');
                        }
                    );
                }
            }
        });

        giftCodePopup = game.add.image(game.world.centerX, game.world.centerY, 'top_bar');
        giftCodePopup.anchor.set(0.5);
        giftCodePopup.scale.setTo(0.9, 9);
        
        congratText = game.add.text(0, 0, 'Chúc mừng\nbạn đã nhận được giftcode:', {font: 'Tahoma', fontSize: 70 });
        congratText.anchor.set(0.5);
        congratText.x = game.world.centerX;
        congratText.y = game.world.centerY - ((giftCodePopup.height/2) - 200);
        giftCodeText = game.add.text(0, 0, '', {font: 'Tahoma', fontSize: 108 });
        giftCodeText.anchor.set(0.5);
        giftCodeText.x = game.world.centerX;
        giftCodeText.y = giftCodePopup.y;
        btnChoiLai = game.add.image(game.world.centerX - 200, game.world.centerY + (giftCodePopup.height/2 - 150), 'play_again');
        btnChoiLai.anchor.set(0.5);
        btnKhampha = game.add.image(game.world.centerX + 200, game.world.centerY + (giftCodePopup.height/2 - 150), 'khampha_uudai');
        btnKhampha.anchor.set(0.5);
        btnChoiLai.events.onInputDown.add(this.onClickBtnChoiLai, this);
        btnKhampha.events.onInputDown.add(this.onClickBtnKhamPhaUuDai, this);
        giftCodePopup.visible = false;
        congratText.visible = false;
        giftCodeText.visible = false;
        btnChoiLai.visible = false;
        btnKhampha.visible = false;
        btnChoiLai.inputEnabled = true;
        btnKhampha.inputEnabled = true;
        giftCodePopup.inputEnabled = true;
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
            TH.isPlayAgain = true;
            game.state.start('Gameplay');
          });
    },
    onClickNhanQua: function()
    {
        var request = {};
        request["eventKey"] = "REQUEST_GIFT_CODE";
        request["SCORE"] = TH.score;
        request["USER_ID"] = TH.userId;
        gamesparks.sendWithData("LogEventRequest", request, function(response){
            //show get code popup
            giftCodePopup.visible = true;
            congratText.visible = true;
            giftCodeText.visible = true;
            btnChoiLai.visible = true;
            btnKhampha.visible = true;
            giftCodeText.setText(response.scriptData.data.code);
        });
    },
    onClickBtnChoiLai: function()
    {
        TH.score = 0;
        TH.isPlayAgain = false;
        TH.isGameOver = false;
        game.state.start('MainMenu');
    },
    onClickBtnKhamPhaUuDai: function()
    {
        window.open("http://kichi.com.vn/vi/ưu-dai/", "_blank");
    },
    onLoadTextureDone: function(texture, key)
    {
        texture.loadTexture(key);
    }
};


