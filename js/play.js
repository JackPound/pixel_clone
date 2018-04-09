console.log('play.js linked');

var playState = {
	player: null,
	mob: null,
	create: function() {
		var self = this;
				// bring new player into world
		self.player = new Player(game.world.centerX, game.world.centerY);
		game.add.existing(self.player);
		game.physics.enable(self.player, Phaser.Physics.ARCADE);
				// enemy stuff needs to be put in object
		self.enemy = game.add.sprite(200, 200, 'rat');
		self.enemy.frame = 0;
		game.add.existing(self.enemy);
		game.physics.enable(self.enemy, Phaser.Physics.ARCADE);
		self.enemy.anchor.setTo(.5, 1);
		self.enemy.scale.setTo(3, 3);
		self.enemy.body.immovable = true;


		// self.mob = game.add.group();
		// self.mob.add(Enemy(100, 100));
		// self.mob.add(Enemy(200, 200));
		// self.mob.forEach(function(enemy, index) {
		// 	game.physics.enable(enemy, Phaser.Physics.ARCADE);
		// 	enemy.body.immovable = true;
		// });

		xDestination = null;
		yDestination = null;
		game.input.activePointer.capture = true;
	},

	update: function() {
		var self = this;
		// self.player.animations.play('idle');
		self.movePlayer();
		self.player.update();
		game.physics.arcade.collide(self.player, self.enemy, function(){
			self.stopPlayer();
		});
	},
			// handles player movement and animation while idle and moving
	movePlayer: function() {
		var self = this;
		let playerVelocity = self.player.body.velocity
			// idle animation when not moving

			// move player left / right
		if (game.input.activePointer.isDown) {
			xDestination = game.input.x;
			if (self.player.x < xDestination) {
				playerVelocity.x = 150;
				self.player.scale.x = 3;
			} else if (self.player.x > xDestination) {
				playerVelocity.x = -150
				self.player.scale.x = -3;
			}
		}
			// stop left / right movement when arriving at destination
		if (self.player.x - xDestination < 3 && self.player.x -xDestination > -3) {
			playerVelocity.x = 0
		}
			// move player up / down
		if (game.input.activePointer.isDown) {
			yDestination = game.input.y;
			if (self.player.y < yDestination) {
				playerVelocity.y = 150
			} else if (self.player.y > yDestination) {
				playerVelocity.y = -150
			}	
		}
			// stop up / down movement when arriving at destination
		if (self.player.y - yDestination < 3 && self.player.y - yDestination > -3) {
			playerVelocity.y = 0
		}
			// walking animation while moving
		if (playerVelocity.y > 49 | playerVelocity.y < -49 | playerVelocity.x > 49 | playerVelocity.x < -49) {
			self.player.animations.play('walk')
		}
	},
			// calls player to stop movement
	stopPlayer: function() {
		var self = this;
		self.player.xDestination = self.player.x;
		self.player.yDestination = self.player.y;
		self.player.body.velocity.x = self.player.body.velocity.y = 0
	}
};

			//refactoring player into an object necessities
function Player(x, y) {
	var player = game.add.sprite(game.world.centerX, game.world.centerY, 'warrior');

	player.frame = 0;
	player.scale.setTo(3,3);
	player.xDestination = x;
	player.yDestination = y;
	player.anchor.setTo(.5, 1);
	player.animations.add('idle', [0,1], .4);
	player.animations.add('walk', [0,2], 4);
	player.update = function() {
		player.appearance();
	};
	player.appearance = function() {
		// if (self.body.velocity.x === 0 && self.body.velocity.y === 0) {
		// 	self.animations.play('idle');
		console.log('it inside');
		
	};

	player.setDest = function(x, y){
		player.xDestination = x;
		player.yDestination = y;
	};
	return player;
};

// function Enemy(x, y) {
// 	var enemy = game.add.sprite(x, y, 'rat')
// 	enemy.xDestination = x;
// 	enemy.yDestination = y;
// 	enemy.frame = 0;
// 	enemy.scale.setTo(3, 3);
// 	enemy.anchor.setTo(.5, 1);
// }
