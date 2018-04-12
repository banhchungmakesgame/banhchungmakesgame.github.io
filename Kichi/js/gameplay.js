TH.Gameplay = function(){
    
};

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
TH.Gameplay.prototype = 
{
    init: function()
    {
        var timer, timerEvent, text;           
    },
    preload: function()
    {
        
    }, 
    create: function()
    {      
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'ingame_bg');
        bg.anchor.set(0.5);
        nextFire = 0;
        fireRate = 400;
        
        // Create a custom timer
        timer = game.time.create();        
        // Create a delayed event 1m and 30s from now
        timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);        
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

        live1 = game.add.image(game.world.centerX, 95, 'live');
        live1.anchor.set(0.5);
        live1.scale.setTo(0.3, 0.3);
        live1.x -= (live1.width/2 + 35);
        live2 = game.add.image(game.world.centerX, 95, 'live');
        live2.anchor.set(0.5);
        live2.scale.setTo(0.3, 0.3);
        live3 = game.add.image(game.world.centerX, 95, 'live');
        live3.anchor.set(0.5);
        live3.scale.setTo(0.3, 0.3);
        live3.x += (live3.width/2 + 35);        

        spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        text = game.add.bitmapText(game.world.width, 95, 'spaceComics', 'Kichi', 108);
        text.anchor.set(1, 0.5);
        text.x -= 45;
        scoreText = game.add.bitmapText(45, 95, 'spaceComics', TH.score, 108);
        scoreText.anchor.set(0, 0.5);
    },
    update: function () {
        currentTimer = Math.round((timerEvent.delay - timer.ms) / 1000);
        text.setText(this.formatTime(currentTimer));
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
        game.state.start('Result');
    },
    formatTime: function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    },
    fire: function(){
        if (this.time.now > nextFire && bullets.countDead() > 0)
        {
            nextFire = this.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(gun.x - 8, gun.y - 8);
            bullet.scale.setTo(2);

            game.physics.arcade.moveToXY(bullet, game.world.width, -50, 1200, 500);
        }
    }, 
    createEnemy: function(){
        if (spawnAllowed) {
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
            }                
            else
            {
                item = bombs.getFirstDead();
                item.name = 'bomb';
            }                

            item.reset(0, 0);
            item.anchor.set(0.5);
            item.scale.setTo(1);
            
            console.log('speed: ' + this.getItemSpeed());
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
            var sprite = game.add.sprite(item.centerX, item.centerY, 'fire');
            sprite.scale.setTo(2, 2);
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
    },
    bombCollisionHandler: function(bullet, item)
    {   
        bullet.kill();
        game.tweens.removeFrom(item);
        item.kill();
        game.state.start('Result');
    },
    getItemSpawnTime: function(){
        if(currentTimer > 85)
        {
            return 700;
        }
        if(currentTimer <= 85 && currentTimer > 80)
        {
            return 650;
        }
        else if(currentTimer <= 80 && currentTimer > 75)
        {
            return 600;
        }
        else if(currentTimer <= 75 && currentTimer > 70)
        {
            return 550;
        }
        else if(currentTimer <= 70 && currentTimer > 65)
        {
            return 525;
        }
        else if(currentTimer <= 65 && currentTimer > 60)
        {
            return 500;
        }
        else if(currentTimer <= 60 && currentTimer > 55)
        {
            return 475;
        }
        else if(currentTimer <= 55 && currentTimer > 50)
        {
            return 450;
        }
        else if(currentTimer <= 50 && currentTimer > 40)
        {
            return 425;
        }
        else if(currentTimer <= 40 && currentTimer > 20)
        {
            return 400;
        }
        else if(currentTimer <= 20)
        {
            return 350;
        }
        else
        {
            return 700;
        }
    },
    getItemSpeed: function(){
        if(currentTimer > 80)
        {
            return 3000;
        }
        else if(currentTimer <= 80 && currentTimer > 70)
        {
            return 2800;
        }
        else if(currentTimer <= 70 && currentTimer > 60)
        {
            return 2600;
        }
        else if(currentTimer <= 60 && currentTimer > 50)
        {
            return 2400;
        }
        else if(currentTimer <= 50 && currentTimer > 40)
        {
            return 2200;
        }
        else if(currentTimer <= 40 && currentTimer > 30)
        {
            return 2000;
        }
        else if(currentTimer <= 30 && currentTimer > 20)
        {
            return 1900;
        }
        else if(currentTimer <= 20 && currentTimer > 10)
        {
            return 1800;
        }
        else if(currentTimer <= 5)
        {
            return 1700;
        }
        else
        {
            return 3000;
        }
    }
};
