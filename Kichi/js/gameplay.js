TH.Gameplay = function(){
    var spawnAllowed = true;
    var items;
    var bullets, gun;    
    var fireRate;
    var nextFire; 
    var spacebarKey;
    var isReversing = false;
    var scoreText;
    var itemSpawnSpeed = 1000;
    var currentTimer;
    var bombs;
    var live1, live2, live3;
    var effects;
    var shoot, coin, wrong;
};

TH.Gameplay.prototype = 
{
    init: function()
    {
        var timer, timerEvent, text;         
        TH.Gameplay.spawnAllowed = true;  
        TH.Gameplay.currentTimer = 0;
    },
    preload: function()
    {
        
    }, 
    create: function()
    {      
        shoot = game.add.audio('shoot');
        coin = game.add.audio('coin');
        wrong = game.add.audio('wrong');
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'ingame_bg');
        bg.anchor.set(0.5);
        nextFire = 0;
        fireRate = 400;
        
        // Create a custom timer
        timer = game.time.create();        
        // Create a delayed event 1m and 30s from now
        timerEvent = timer.add(Phaser.Timer.MINUTE * 20, this.endTimer, this);        
        // Start the timer
        timer.start();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        items = this.game.add.group(); // create group
        items.enableBody = true;
        items.physicsBodyType = Phaser.Physics.ARCADE;
        items.createMultiple(50, 'item1');
        items.setAll('checkWorldBounds', true);
        items.setAll('outOfBoundsKill', true);

        bombs = this.game.add.group(); // create group
        bombs.enableBody = true;
        bombs.physicsBodyType = Phaser.Physics.ARCADE;
        bombs.createMultiple(50, 'bomb');
        bombs.setAll('checkWorldBounds', true);
        bombs.setAll('outOfBoundsKill', true);

        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        gun = game.add.sprite(35, game.world.height, 'gun');
        gun.x += gun.width / 2;
        gun.y -= gun.height/2 + 35;
        gun.anchor.set(0.5);
        game.physics.enable(gun, Phaser.Physics.ARCADE);
        gun.body.allowRotation = false;
        game.physics.arcade.enable([bullets, items]);
        game.physics.arcade.enable([bullets, bombs]);

        this.createEnemy();

        var top_bar = game.add.image(game.world.centerX, 0, 'top_bar');
        top_bar.anchor.set(0.5);
        top_bar.y += top_bar.height/2;

        live1 = game.add.image(game.world.centerX+250, 95, 'live');
        live1.anchor.set(0.5);
        live1.scale.setTo(1, 1);
        live1.x -= (live1.width/2 + 55);
        live2 = game.add.image(game.world.centerX+250, 95, 'live');
        live2.anchor.set(0.5);
        live2.scale.setTo(1, 1);
        live3 = game.add.image(game.world.centerX+250, 95, 'live');
        live3.anchor.set(0.5);
        live3.scale.setTo(1, 1);
        live3.x += (live3.width/2 + 55);        

        spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //text = game.add.bitmapText(game.world.width, 95, 'spaceComics', 'Kichi', 108);
        //text.anchor.set(1, 0.5);
        //text.x -= 45;
        scoreText = game.add.bitmapText(45, 95, 'spaceComics', TH.score, 108);
        scoreText.setText(TH.score);
        scoreText.anchor.set(0, 0.5);
    },
    update: function () {
        if(TH.isGameOver)
        {
            return;
        }
        TH.Gameplay.currentTimer = 1200 - (Math.round((timerEvent.delay - timer.ms) / 1000));
        //text.setText(this.formatTime(currentTimer));
        if (game.input.activePointer.isDown)
        {
            this.fire();        
        }

        if(spacebarKey.isDown)
        {
            var allTweens = game.tweens.getAll();  
            allTweens.forEach(element => {
                element.reverse = !element.reverse;
            });
        }

        game.physics.arcade.overlap(bullets, items, this.collisionHandler, null, this);
        game.physics.arcade.overlap(bullets, bombs, this.bombCollisionHandler, null, this);
    },
    endTimer: function() {
        // Stop the timer when the delayed event triggers
        timer.stop();
    },
    formatTime: function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    },
    fire: function(){
        if(TH.isGameOver)
        {
            return;
        }
        if (this.time.now > nextFire && bullets.countDead() > 0)
        {
            shoot.play();
            nextFire = this.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(gun.x - 8, gun.y - 8);
            bullet.scale.setTo(1);

            game.physics.arcade.moveToXY(bullet, game.world.width, -50, 1200, 500);
        }
    }, 
    createEnemy: function(){
        if (TH.Gameplay.spawnAllowed) {
            //dish.play();
            var randomNo = game.rnd.integerInRange(0,1);
            var item;
            if(randomNo == 0)
            {
                item = items.getFirstDead();
                var itemType = game.rnd.integerInRange(1, 4);
                if(itemType == 1)
                {
                    item.loadTexture('item1');
                    item.name = 'item1';
                }
                else if(itemType == 2)
                {
                    item.loadTexture('item2');
                    item.name = 'item2';
                }
                else if(itemType == 3)
                {
                    item.loadTexture('item3');
                    item.name = 'item3';
                }
                else
                {
                    item.loadTexture('item4');
                    item.name = 'item4';
                }                
                item.scale.setTo(1);
            }                
            else
            {
                item = bombs.getFirstDead();
                item.name = 'bomb';
                item.scale.setTo(0.75);
            }                

            item.reset(0, 0);
            item.anchor.set(0.5);            
            
            var tween = this.game.add.tween(item).to({
            x: [0, 25,50,106,175,259,340,421,507,588,678,759,834,876,898,884,851,786,714,630,546,468,385,306,256,256,301,382,460,538,622,694,756,820,859,895,904,898,881,867,848, 848],
            y: [0, 87,160,224,268,302,316,324,330,324,330,341,369,444,525,609,676,734,776,799,810,838,863,902,969,1050,1120,1161,1192,1200,1237,1267,1329,1393,1466,1538,1622,1697,1787,1856,1904, 2050],
            }, this.getItemSpeed(),Phaser.Easing.Linear.In, true).interpolation(function(v, k){
                return Phaser.Math.bezierInterpolation(v, k);
            });
            tween.onComplete.add(function() {
                item.kill();
                if(item.name.startsWith('item'))
                {
                    TH.live -= 1;
                    if(TH.live === 2)
                        live3.visible = false;
                    else if(TH.live === 1)
                        live2.visible = false;
                    else if(TH.live <= 0)
                    {
                        live1.visible = false;    
                        game.state.start('Result');        
                    }
                }                
            }, this);
            this.game.time.events.add(this.getItemSpawnTime(), this.createEnemy, this);
       }
    },
    collisionHandler: function(bullet, item)
    {
        if(item.name.startsWith('item'))
        {
            coin.play();
            var sprite = game.add.sprite(item.centerX, item.centerY, 'fire');
            sprite.scale.setTo(1.75, 1.75);
            sprite.anchor.set(0.5);
            var anim = sprite.animations.add('explosion');
            sprite.animations.play('explosion', 24, false);
            anim.killOnComplete = true;

            TH.score += 5;
            scoreText.setText(TH.score);
            bullet.kill();
            item.loadTexture(item.name + '_open');
            item.name = 'collected';
        }        
        else if(item.name.startsWith('collected'))
        {
            bullet.kill();
        }
    },
    bombCollisionHandler: function(bullet, item)
    {   
        item.loadTexture(item.name + '_open');
        var sprite = game.add.sprite(item.centerX, item.centerY, 'fire');
        sprite.scale.setTo(1.75, 1.75);
        sprite.anchor.set(0.5);
        var anim = sprite.animations.add('explosion');
        sprite.animations.play('explosion', 24, false);
        anim.killOnComplete = true;
        bullet.kill();
        this.gameOver();        
    },
    getItemSpawnTime: function(){
        if(TH.Gameplay.currentTimer <= 10)
        {
            return game.rnd.integerInRange(650, 750);
        }
        if(TH.Gameplay.currentTimer > 10 && TH.Gameplay.currentTimer <= 20)
        {
            return game.rnd.integerInRange(550, 650);
        }
        else if(TH.Gameplay.currentTimer <= 30 && TH.Gameplay.currentTimer > 20)
        {
            return game.rnd.integerInRange(450, 550);
        }
        else if(TH.Gameplay.currentTimer <= 40 && TH.Gameplay.currentTimer > 30)
        {
            return game.rnd.integerInRange(450, 550);
        }
        else if(TH.Gameplay.currentTimer <= 50 && TH.Gameplay.currentTimer > 40)
        {
            return game.rnd.integerInRange(350, 450);
        }
        else if(TH.Gameplay.currentTimer <= 60 && TH.Gameplay.currentTimer > 50)
        {
            return game.rnd.integerInRange(250, 350);
        }
        else if(TH.Gameplay.currentTimer <= 70 && TH.Gameplay.currentTimer > 60)
        {
            return game.rnd.integerInRange(230, 250);
        }
        else if(TH.Gameplay.currentTimer <= 80 && TH.Gameplay.currentTimer > 70)
        {
            return game.rnd.integerInRange(200, 230);
        }
        else if(TH.Gameplay.currentTimer <= 90 && TH.Gameplay.currentTimer > 80)
        {
            return game.rnd.integerInRange(180, 200);
        }
        else if(TH.Gameplay.currentTimer <= 100 && TH.Gameplay.currentTimer > 90)
        {
            return game.rnd.integerInRange(160, 180);
        }
        else if(TH.Gameplay.currentTimer > 100)
        {
            return game.rnd.integerInRange(140, 160);
        }
        else
        {
            return game.rnd.integerInRange(650, 750);
        }
    },
    getItemSpeed: function(){
        if(TH.Gameplay.currentTimer <= 10)
        {
            return 3000;
        }
        else if(TH.Gameplay.currentTimer <= 20 && TH.Gameplay.currentTimer > 10)
        {
            return 2800;
        }
        else if(TH.Gameplay.currentTimer <= 30 && TH.Gameplay.currentTimer > 20)
        {
            return 2600;
        }
        else if(TH.Gameplay.currentTimer <= 40 && TH.Gameplay.currentTimer > 30)
        {
            return 2400;
        }
        else if(TH.Gameplay.currentTimer <= 50 && TH.Gameplay.currentTimer > 40)
        {
            return 2200;
        }
        else if(TH.Gameplay.currentTimer <= 60 && TH.Gameplay.currentTimer > 50)
        {
            return 2000;
        }
        else if(TH.Gameplay.currentTimer <= 70 && TH.Gameplay.currentTimer > 60)
        {
            return 1900;
        }
        else if(TH.Gameplay.currentTimer <= 80 && TH.Gameplay.currentTimer > 70)
        {
            return 1800;
        }
        else if(TH.Gameplay.currentTimer > 80)
        {
            return 1700;
        }
        else
        {
            return 3000;
        }
    },
    goToResult: function()
    {
        game.state.start('Result');
    },
    gameOver: function()
    {
        wrong.play();
        TH.isGameOver = true;
        game.tweens.removeAll();
        this.game.time.events.removeAll();
        this.game.time.events.add(2000, this.goToResult, this);
    }
};
