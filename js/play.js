console.log('play.js linked');

var playState = {
	player: null,
	mob: null,
	create: function() {
		var self = this;

				// refactoring player into an object necessities
		self.player = new Player(game.world.centerX, game.world.centerY);
		game.add.existing(self.player);
		game.physics.enable(self.player, Phaser.Physics.ARCADE);

				// player stuff NOT in an object
		// self.player = game.add.sprite(game.world.centerX, game.world.centerY, 'warrior')
		// self.player.frame = 0;
		// game.add.existing(self.player);
		// self.player.anchor.setTo(.5, 1);
		// self.player.scale.setTo(3, 3);
		// self.player.animations.add('idle', [0,1], .4);
		// self.player.animations.add('walk', [0,2], 4);
		// game.physics.enable(self.player, Phaser.Physics.ARCADE);


				// enemy stuff needs to be put in object
		self.enemy = game.add.sprite(200, 200, 'rat');
		self.enemy.frame = 0;
		game.add.existing(self.enemy);
		game.physics.enable(self.enemy, Phaser.Physics.ARCADE);
		self.enemy.anchor.setTo(.5, 1);
		self.enemy.scale.setTo(3, 3);
		self.enemy.body.immovable = true;

		xDestination = null;

		yDestination = null;
		game.input.activePointer.capture = true;
	},

	update: function() {
		var self = this;
		self.movePlayer();
		game.physics.arcade.collide(self.player, self.enemy, function(){
			self.player.stop();
		});
		console.log(xDestination);

	},
			// handles player movement and animation while idle and moving
	movePlayer: function() {
		var self = this;
		let playerVelocity = self.player.body.velocity
			// idle animation when not moving
		if (playerVelocity.x === 0 && playerVelocity.y === 0) {
			self.player.animations.play('idle');
		}
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
	}
			// calls player to stop movement
	// stopPlayer: function() {
	// 	var self = this;
	// 	self.player.xDestination = self.player.x;
	// 	self.player.yDestination = self.player.y;
	// 	self.player.body.velocity.x = self.player.body.velocity.y = 0
	// }
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

	// player.setDest = function(x, y){
	// 	player.xDestination = x;
	// 	player.yDestination = y;
	// };

	player.update = function() {
		var self = this;
		player.stop = function() {
			var self = this;
			self.player.xDestination = self.player.x;
			self.player.yDestination = self.player.y;
			self.player.body.velocity.x = self.player.body.velocity.y = 0
		}
	}

	// 	let playerVelocity = self.player.body.velocity
	// 	// idle animation when not moving
	// 	if (playerVelocity.x === 0 && playerVelocity.y === 0) {
	// 		self.player.animations.play('idle');
	// 	}
	// 	// move player left / right
	// 	if (game.input.activePointer.isDown) {
	// 		xDestination = game.input.x;
	// 		if (self.player.x < xDestination) {
	// 			playerVelocity.x = 150;
	// 			self.player.scale.x = 3;
	// 		} else if (self.player.x > xDestination) {
	// 			playerVelocity.x = -150
	// 			self.player.scale.x = -3;
	// 		}
	// 	}
	// 	// stop left / right movement when arriving at destination
	// 	if (self.player.x - xDestination < 3 && self.player.x -xDestination > -3) {
	// 		playerVelocity.x = 0
	// 	}
	// 	// move player up / down
	// 	if (game.input.activePointer.isDown) {
	// 		yDestination = game.input.y;
	// 		if (self.player.y < yDestination) {
	// 			playerVelocity.y = 150
	// 		} else if (self.player.y > yDestination) {
	// 			playerVelocity.y = -150
	// 		}	
	// 	}
	// 	// stop up / down movement when arriving at destination
	// 	if (self.player.y - yDestination < 3 && self.player.y - yDestination > -3) {
	// 		playerVelocity.y = 0
	// 	}
	// 	// walking animation while moving
	// 	if (playerVelocity.y > 49 | playerVelocity.y < -49 | playerVelocity.x > 49 | playerVelocity.x < -49) {
	// 		self.player.animations.play('walk')
	// 	}
	// },


	return player;
};