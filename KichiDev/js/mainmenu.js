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
        playButton.events.onInputDown.add(this.onClickOnBtnPlay, this);
    },
    onClickOnBtnPlay: function(){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              console.log('Logged in.');
            }
            else {
                FB.login(function(response) {
                    if (response.status === 'connected') {
                        // Logged into your app and Facebook.
                        console.log('logged in.');
                    } else {
                        // The person is not logged into this app or we are unable to tell. 
                    }
                });
            }
        });
    }
};