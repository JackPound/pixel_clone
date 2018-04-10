console.log('play.js linked');

var playState = {
	player: null,
	mob: null,
	layer: null,
	create: function() {
				// set up world from imported TILED
		// var map = game.add.tilemap('room1');
		// map.addTilesetImage('world', 'tiles1');

				// bring new player into world
		this.player = new Player(game.world.centerX, game.world.centerY);
		game.add.existing(this.player);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);

		// this.layer = map.createLayer('floor'); 
				// bring mob of enemies into world
		this.mob = game.add.group();
		this.mob.add(Enemy(100, 100));
		this.mob.add(Enemy(200, 200));
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
		this.player.update();
		this.mob.forEach(function(enemy, index) {
			enemy.update();
		});
		game.physics.arcade.collide(this.player, this.mob, function(){
			playState.player.stopPlayer();
		});
	}
};
		// player constructor
function Player(x, y) {
	var player = game.add.sprite(game.world.centerX, game.world.centerY, 'warrior');
	player.frame = 0;
	player.z = 3;
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
	enemy.scale.setTo(3, 3);
	enemy.anchor.setTo(.5, 1);
	enemy.animations.add('idle', [0, 8], 3);
	enemy.animations.add('attack', [0, 2], 3);
	enemy.goToXY = function(x, y) {

	}
	enemy.update = function() {
		enemy.animations.play('idle');
	}
	enemy.stop = function() {

	}
	return enemy;
}
