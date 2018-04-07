window.fbAsyncInit = function() {
    FB.init({
      appId            : '158000174877255',
      autoLogAppEvents : true,
      xfbml            : false,
      version          : 'v2.12'
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
    
};
var playButton;
var helloText;
var fbBtn;
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
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'bg');
        bg.anchor.set(0.5);
        var title = game.add.image(game.world.centerX, 200, 'title');
        title.anchor.set(0.5);

        fbBtn = this.add.image(game.world.centerX, game.world.centerY, 'fb_login');
        fbBtn.anchor.set(0.5);
        fbBtn.scale.setTo(0.5, 0.5);
        fbBtn.inputEnabled = true;
        fbBtn.events.onInputDown.add(this.onClickOnBtnFB, this);

        playButton = this.add.image(game.world.centerX, game.world.centerY, 'play');
        playButton.anchor.set(0.5);
        playButton.scale.setTo(1, 1);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.onClickOnBtnPlay, this);
        playButton.visible = false;

        var style = { font: "30px Tahoma", fill: "#00d20a", align: "center" };
        helloText = game.add.text(game.world.centerX, game.world.centerY + 100, 'Hello: ', style);
        helloText.anchor.set(0.5);
        helloText.visible = false;

        var rulesBtn = this.add.image(game.world.centerX + 75, game.world.height - 100, 'rules');
        rulesBtn.anchor.set(0.5);
        rulesBtn.scale.setTo(0.5, 0.5);
        rulesBtn.inputEnabled = true;
        rulesBtn.events.onInputDown.add(this.onClickOnBtnRules, this);

        var giftBtn = this.add.image(game.world.centerX - 75, game.world.height - 100, 'gift');
        giftBtn.anchor.set(0.5);
        giftBtn.scale.setTo(0.5, 0.5);
        giftBtn.inputEnabled = true;
        giftBtn.events.onInputDown.add(this.onClickOnBtnGift, this);

        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                fbBtn.visible = false;
                playButton.visible = true;
                helloText.visible = true;
                FB.api(
                    '/me',
                    'GET',
                    {"fields":"id,name"},
                    function(response) {
                        console.log(response);
                        helloText.setText('Hello: ' + response.name);
                    }
                );
            }
            else {
                FB.login(function(response) {
                    if (response.status == 'connected') {
                        // Logged into your app and Facebook.
                        fbBtn.visible = false;
                        playButton.visible = true;
                        helloText.visible = true;
                        FB.api(
                            '/me',
                            'GET',
                            {"fields":"id,name"},
                            function(response) {
                                console.log(response);
                                helloText.setText('Hello: ' + response.name);
                            }
                        );
                    } else {
                        // The person is not logged into this app or we are unable to tell. 
                    }
                });
            }
        });
    },
    onClickOnBtnFB: function(){
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                fbBtn.visible = false;
                playButton.visible = true;
                helloText.visible = true;
                FB.api(
                    '/me',
                    'GET',
                    {"fields":"id,name"},
                    function(response) {
                        console.log(response);
                        helloText.setText('Hello: ' + response.name);
                    }
                );
            }
            else {
                FB.login(function(response) {
                    if (response.status == 'connected') {
                        // Logged into your app and Facebook.
                        fbBtn.visible = false;
                        playButton.visible = true;
                        helloText.visible = true;
                        FB.api(
                            '/me',
                            'GET',
                            {"fields":"id,name"},
                            function(response) {
                                console.log(response);
                                helloText.setText('Hello: ' + response.name);
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
        game.state.start('Gameplay');
    },
    onClickOnBtnRules: function(){
        
    },
    onClickOnBtnGift: function(){
        
    }
};