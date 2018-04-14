window.fbAsyncInit = function() {
    FB.init({
      appId            : '158000174877255',
      autoLogAppEvents : true,
      xfbml            : false,
      version          : 'v2.12',
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/vi_VN/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

TH.MainMenu = function(game){
    var playButton;
    var helloText;
    var fbBtn;
    var listGcButton = [];
    var listGcText = [];
    var giftCodePopup;
    var titleGC;
    var btnPrev;
    var btnNext;
    var gcData = [];
};

TH.MainMenu.prototype = 
{
    init: function()
    {
        TH.MainMenu.listGcButton = [];
        TH.MainMenu.listGcText = [];
    },
    preload: function()
    {
        
    }, 
    create: function()
    {         
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'bg');
        bg.scale.setTo(1, 1);
        bg.anchor.set(0.5);
        var title = game.add.image(game.world.centerX, 450, 'title');
        title.anchor.set(0.5);

        fbBtn = this.add.image(game.world.centerX, game.world.centerY - 15, 'fb_login');
        fbBtn.anchor.set(0.5);
        fbBtn.scale.setTo(1, 1);
        fbBtn.inputEnabled = true;
        fbBtn.events.onInputDown.add(this.onClickOnBtnFB, this);

        TH.MainMenu.playButton = this.add.image(game.world.centerX, game.world.centerY, 'play');
        TH.MainMenu.playButton.anchor.set(0.5);
        TH.MainMenu.playButton.scale.setTo(1, 1);
        TH.MainMenu.playButton.inputEnabled = true;
        TH.MainMenu.playButton.events.onInputDown.add(this.onClickOnBtnPlay, this);
        TH.MainMenu.playButton.visible = false;

        var rulesBtn = this.add.image(game.world.centerX + 350, game.world.height - 95, 'rules');
        rulesBtn.anchor.set(0.5);
        rulesBtn.scale.setTo(1, 1);
        rulesBtn.inputEnabled = true;
        rulesBtn.events.onInputDown.add(this.onClickOnBtnRules, this);

        var giftBtn = this.add.image(game.world.centerX - 350, game.world.height - 95, 'gift');
        giftBtn.anchor.set(0.5);
        giftBtn.scale.setTo(1, 1);
        giftBtn.inputEnabled = true;
        giftBtn.events.onInputDown.add(this.onClickOnBtnGift, this);

        //#region  show gift code popup
        TH.MainMenu.giftCodePopup = this.add.image(game.world.centerX, game.world.centerY, 'top_bar');
        TH.MainMenu.giftCodePopup.anchor.set(0.5);
        TH.MainMenu.giftCodePopup.scale.setTo(0.9, 9);        
        TH.MainMenu.titleGC = this.add.text(0, 0, 'Danh sách GIFTCODE', {font: 'Tahoma', fontSize: 55 });
        TH.MainMenu.titleGC.anchor.set(0.5);
        TH.MainMenu.titleGC.x = game.world.centerX;
        TH.MainMenu.titleGC.y = game.world.centerY - ((TH.MainMenu.giftCodePopup.height/2) - 50);
        TH.MainMenu.btnPrev = game.add.image(game.world.centerX - 400, game.world.centerY + (TH.MainMenu.giftCodePopup.height/2 - 75), 'prev');
        TH.MainMenu.btnPrev.anchor.set(0.5);
        TH.MainMenu.btnNext = this.add.image(game.world.centerX + 400, game.world.centerY + (TH.MainMenu.giftCodePopup.height/2 - 75), 'next');
        TH.MainMenu.btnNext.anchor.set(0.5);
        TH.MainMenu.btnPrev.events.onInputDown.add(this.onClickBtnPrev, this);
        TH.MainMenu.btnNext.events.onInputDown.add(this.onClickBtnNext, this);        
        TH.MainMenu.btnPrev.inputEnabled = true;
        TH.MainMenu.btnNext.inputEnabled = true;
        TH.MainMenu.giftCodePopup.inputEnabled = true;
        TH.MainMenu.titleGC.inputEnabled = true;
        TH.MainMenu.titleGC.events.onInputDown.add(this.onClickToTitle, this);

        var startPoint = TH.MainMenu.titleGC.y + TH.MainMenu.titleGC.height;
        for(var i=0;i<15;i++)
        {
            var gc_item;
            var gc_text;
            if(i%2 == 0)
            {
                gc_item = game.add.image(game.world.centerX, startPoint + (i*80) + 25, 'chan');                
            }
            else
            {
                gc_item = game.add.image(game.world.centerX, startPoint + (i*80) + 25, 'le');                
            }
            gc_text = game.add.text(game.world.centerX, startPoint + (i*80) + 25, 'CODE 1', {font: 'Tahoma', fontSize: 35 });
            gc_text.anchor.set(0.5);
            gc_item.anchor.set(0.5);
            gc_item.name = i;
            gc_item.inputEnabled = true;
            gc_item.events.onInputDown.add(this.onClickToGCItem, this);
            TH.MainMenu.listGcButton.push(gc_item);
            TH.MainMenu.listGcText.push(gc_text);
        }       
        this.onClickToTitle();
        //#endregion
    },
    onClickOnBtnFB: function(){
        FB.getLoginStatus(function(response) {

            if (response.status == 'connected') {
                // Logged into your app and Facebook.
                TH.fbAccessToken = response.authResponse.accessToken;
                TH.MainMenu.fbBtn.visible = false;
                TH.MainMenu.playButton.visible = true;
                FB.api(
                    '/me',
                    'GET',
                    {"fields":"id,name"},
                    function(response) {
                        TH.fbUserName = response.name;
                    }
                );
            } else {
                FB.login(function(response) {
                if (response.status === 'connected') {
                // Logged into your app and Facebook.
                TH.fbAccessToken = response.authResponse.accessToken;
                    fbBtn.visible = false;
                    TH.MainMenu.playButton.visible = true;
                    FB.api(
                        '/me',
                        'GET',
                        {"fields":"id,name"},
                        function(response) {
                            TH.fbUserName = response.name;
                        }
                    );
                } else {
                // The person is not logged into this app or we are unable to tell. 
                }
            });                
            }
        });     

    },
    onClickOnBtnPlay: function(){
        this.gamesparksFacebookAuthenticate(TH.fbAccessToken, TH.fbUserName);
        this.game.scale.setMaximum();
        this.game.scale.startFullScreen(false);
        TH.score = 0;
        TH.isPlayAgain = false;
        TH.isGameOver = false;
        game.state.start('Gameplay');
    },
    onClickOnBtnRules: function(){
        
    },
    onClickOnBtnGift: function(){  
        if(!gamesparks.getAuthToken())
        {
            window.alert('Bạn vui lòng đăng nhập facebook để xem giỏ quà nhé <3');
            retturn;
        }
        TH.MainMenu.giftCodePopup.visible = true;
        TH.MainMenu.titleGC.visible = true;
        TH.MainMenu.btnPrev.visible = true;
        TH.MainMenu.btnNext.visible = true;   
        var request = {};
        request["eventKey"] = "GET_LIST_GC_OF_USER";
        request["USER_ID"] = TH.userId;
        gamesparks.sendWithData("LogEventRequest", request, function(response){
            if(response.data)
            {
                for(var i=0;i<15;i++)
                {
                    if(response.data[i])
                    {
                        listGcButton[i].visible = true;
                        listGcText[i].visible = true;
                        listGcText[i].setText(response.data.giftCode);
                    }
                }
            }
        });
    },
    gamesparksFacebookAuthenticate : function(tokenFB, displayName)
    {
        gamesparks.facebookConnectRequest(tokenFB, "", function(response) {
            TH.userId = response.userId;
        });
    },
    onClickBtnNext: function()
    {

    },
    onClickBtnPrev: function()
    {

    },
    onClickToGCItem: function(index)
    {

    },
    onClickToTitle: function()
    {
        TH.MainMenu.giftCodePopup.visible = false;
        TH.MainMenu.titleGC.visible = false;
        TH.MainMenu.btnPrev.visible = false;
        TH.MainMenu.btnNext.visible = false;
        TH.MainMenu.listGcButton.forEach(element => {
            element.visible = false;
        });
        TH.MainMenu.listGcText.forEach(element => {
            element.visible = false;
        });
    }
};