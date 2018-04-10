console.log('play.js linked');

var playState = {
	player: null,
	mob: null,
	layer: null,
	create: function() {
				// set up world from imported TILED
		var map = game.add.tilemap('room1');
		map.addTilesetImage('tiles1', 'tiles1');
		map.setCollision([4]);
		this.layer = map.createLayer('floor');
		this.layer = map.createLayer('walls');
				// bring new player into world
		this.player = new Player(game.world.centerX, game.world.centerY);
		game.add.existing(this.player);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);

		
				// bring mob of enemies into world
		this.mob = game.add.group();
		this.mob.add(Enemy(100, 100));
		// this.mob.add(Enemy(200, 200));
		this.mob.forEach(function(enemy, index) {
			game.physics.enable(enemy, Phaser.Physics.ARCADE);
			enemy.body.immovable = true;
		});
				// code doesn't work without x and y destination global for mouse input
		xDestination = null;
		yDestination = null;
		game.input.activePointer.capture = true;
	},
				// update function to constantly run updates on character state / enemy state / world state
	update: function() {
		var self = this
		this.player.update();
		this.mob.forEach(function(enemy, index) {
			enemy.update();
		});
		game.physics.arcade.collide(this.player, this.mob, function(){
			console.log('hit rat')
			playState.player.stopPlayer();
			playState.mob.children[0].stopEnemy();
		});
		game.physics.arcade.collide(this.player, self.layer, function(){
			console.log('hit walls');
			playState.player.stopPlayer();
		})
		// console.log(game.physics.arcade.distanceBetween(this.player, this.mob))
	}
};
		// player constructor
function Player(x, y) {
	var player = game.add.sprite(game.world.centerX, game.world.centerY, 'warrior');
	player.frame = 0;
	// player.z = 3;
	player.scale.setTo(3,3);
	player.xDestination = x;
	player.yDestination = y;
	player.anchor.setTo(.5, 1);
	player.animations.add('idle', [0,1], .4);
	player.animations.add('walk', [0,2], 4);

	player.update = function() {
		player.appearance();
		player.movePlayer();
	};
			//sprite used while walk/idle
	player.appearance = function() {
		let playerVelocity = player.body.velocity
		if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
			player.animations.play('idle');
		}
		if (playerVelocity.y > 49 | playerVelocity.y < -49 | playerVelocity.x > 49 | playerVelocity.x < -49) {
			player.animations.play('walk')
		}
	};
			//move player to click on x/y plane
	player.movePlayer = function() {
		let playerVelocity = player.body.velocity
		if (game.input.activePointer.isDown) {
			xDestination = game.input.x;
			if (player.x < xDestination) {
				playerVelocity.x = 150;
				player.scale.x = 3;
			} else if (player.x > xDestination) {
				playerVelocity.x = -150
				player.scale.x = -3;
			}
		}
		if (player.x - xDestination < 3 && player.x - xDestination > -3) {
			playerVelocity.x = 0
		}
		if (game.input.activePointer.isDown) {
			yDestination = game.input.y;
			if (player.y < yDestination) {
				playerVelocity.y = 150
			} else if (player.y > yDestination) {
				playerVelocity.y = -150
			}	
		}
		if (player.y - yDestination < 3 && player.y - yDestination > -3) {
			playerVelocity.y = 0
		}
	};
	player.stopPlayer = function () {
		player.xDestination = player.x;
		player.yDestination = player.y;
		player.body.velocity.x = player.body.velocity.y = 0
	};
	return player;
};
		// rat enemy constructor
function Enemy(x, y) {
	var enemy = game.add.sprite(x, y, 'rat')
	enemy.xDest = x;
	enemy.yDest = y;
	enemy.frame = 0;
	enemy.scale.setTo(2, 2);
	enemy.anchor.setTo(.5, 1);
	enemy.animations.add('idle', [0, 8], 3);
	enemy.animations.add('attack', [0, 2], 3);
	enemy.goToXY = function(x, y) {
	}
	enemy.chasePlayer = function(){
		game.physics.arcade.moveToObject(playState.mob.children[0], playState.player);
	}
	enemy.update = function() {
		enemy.animations.play('idle');
		 if (55 < game.physics.arcade.distanceBetween(playState.player, playState.mob.children[0]) &&
			game.physics.arcade.distanceBetween(playState.player, playState.mob.children[0]) < 300) {
			enemy.chasePlayer()
			console.log(game.physics.arcade.distanceBetween(playState.player, playState.mob.children[0]));
		} 
	}
	enemy.stopEnemy = function() {
		playState.mob.children[0].body.velocity.x = playState.mob.children[0].body.velocity.y = 0
	}
	return enemy;
};
// function chasePlayer(){
// 	playState.mob.children.forEach(function(e){
// 		game.physics.arcade.moveToObject(e, this.player, 70);
// 	})
// }

