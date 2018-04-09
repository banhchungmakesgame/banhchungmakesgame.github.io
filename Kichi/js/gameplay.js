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
        var bg = game.add.image(game.world.centerX, game.world.centerY, 'bg');
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

        spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var style = { font: "35px Tahoma", fill: "#ff0044", align: "right" };
        text = game.add.text(game.world.width, 30, 'KICHI', style);
        text.x -= text.width;
        text.anchor.set(0.5);
        var scoreStyle = { font: "35px Tahoma", fill: "#ff0044", align: "left" };
        scoreText = game.add.text(25, 5, 'SCORE: 0', scoreStyle);
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

            game.physics.arcade.moveToXY(bullet, game.world.width, 0, 1200, 500);
        }
    }, 
    createEnemy: function(){
        if (spawnAllowed) {
            var randomNo = game.rnd.integerInRange(0,1);
            var item;
            if(randomNo == 0)
                item = items.getFirstDead();
            else
                item = bombs.getFirstDead();
            item.reset(0, 0);
            item.anchor.set(0.5);
            item.scale.setTo(0.325);
            var tween = this.game.add.tween(item).to({
            x: [0, 30, 120, 180, 300, 360, 390, 390, 360, 300, 180, 120, 300, 360, 420, 360],
            y: [0, 50, 110, 125, 125, 150, 200, 250, 300, 325, 360, 425, 500, 550, 700, 900],
            }, this.getItemSpeed(),Phaser.Easing.Linear.In, true).interpolation(function(v, k){
                return Phaser.Math.bezierInterpolation(v, k);
            });
            this.game.time.events.add(this.getItemSpawnTime(), this.createEnemy, this);
       }
    },
    collisionHandler: function(bullet, item)
    {
        TH.score += 5;
        scoreText.setText('SCORE: ' + TH.score);
        bullet.kill();
        game.tweens.removeFrom(item);
        item.kill();
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
        else
        {
            return 350;
        }
    },
    getItemSpeed: function(){
        if(currentTimer > 85)
        {
            return 3000;
        }
        if(currentTimer <= 85 && currentTimer > 80)
        {
            return 2800;
        }
        else if(currentTimer <= 80 && currentTimer > 75)
        {
            return 2600;
        }
        else if(currentTimer <= 75 && currentTimer > 70)
        {
            return 2400;
        }
        else if(currentTimer <= 70 && currentTimer > 65)
        {
            return 2200;
        }
        else if(currentTimer <= 65 && currentTimer > 60)
        {
            return 2000;
        }
        else if(currentTimer <= 60 && currentTimer > 55)
        {
            return 1900;
        }
        else if(currentTimer <= 55 && currentTimer > 50)
        {
            return 1800;
        }
        else if(currentTimer <= 50 && currentTimer > 40)
        {
            return 1700;
        }
        else if(currentTimer <= 40 && currentTimer > 20)
        {
            return 1600;
        }
        else
        {
            return 1500;
        }
    }
};
