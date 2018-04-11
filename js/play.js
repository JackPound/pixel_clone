// console.log('play.js linked');


var playState = {
	player: null,
	mob: null,
	layer: null,
	create: function() {
				// set up world from imported TILED //]
		var map = game.add.tilemap('room1');
		map.addTilesetImage('tiles1', 'tiles1');
		map.setCollision([2, 5]);
		this.layer = map.createLayer('floor');
		this.layer = map.createLayer('walls');
				// bring mob of enemies into world //
		this.mob = game.add.group();
		this.mob.add(Enemy(100, 100));
		this.mob.add(Enemy(200, 200));
		this.mob.forEach(function(enemy, index) {
			game.physics.enable(enemy, Phaser.Physics.ARCADE);
			enemy.body.immovable = true;
		});
				// bring new player into world //
		this.player = new Player(game.world.centerX, game.world.centerY);
		game.add.existing(this.player);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
				// code doesn't work without x and y destination global for mouse input //
		xDestination = null;
		yDestination = null;
		game.input.activePointer.capture = true;
		cooldown = game.time.time;
		score = 0;
		scoreBar = game.add.text (300, 8, "Score:" + score, {font: '24px Space Mono'});
		healthBar = game.add.text(100, 8, this.player.health + "/100 HP", {font: '24px Space Mono'});
	},
				// update function to constantly run updates on character state / enemy state / world state
	update: function() {
		this.player.update();
		game.physics.arcade.collide(this.player, this.mob, collideRat, null, this);
		// game.world.children[4]._text = playState.player.health + "/100 HP"
		healthBar.setText(playState.player.health + "/100 HP");
		checkScore();
		scoreBar.setText("Rats Smashed:" + score);
		
	// });
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
	player.animations.add('death', [8, 10], 2);
	player.health = 100;

	player.update = function() {
		player.appearance();
		player.movePlayer();
		player.death()
	};
	player.attack = function() {

	};
	player.death = function() {
		if (player.health <= 0) {
			player.animations.play('death');
			game.state.start('gameOver')
		}
	}
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
	var self = this;
	var enemy = game.add.sprite(x, y, 'rat')
	enemy.xDest = x;
	enemy.yDest = y;
	enemy.frame = 0;
	enemy.health = 25;
	enemy.attackCooldown = game.time.time;
	enemy.scale.setTo(2, 2);
	enemy.anchor.setTo(.5, 1);
	enemy.animations.add('idle', [0, 8], 3);
	enemy.animations.add('attack', [0, 3], 10);
	enemy.animations.add('death', [14, 15, 16], 1);
	enemy.invincible = game.time.time;
	enemy.dead = false;
	enemy.goToXY = function(x, y) {
	}
	enemy.chasePlayer = function(){
		game.physics.arcade.moveToObject(this, playState.player)
	}
	enemy.update = function() {
		this.animations.play('idle');
		enemy.death();
		playState.mob.children.forEach(function(r){
			if (55 < game.physics.arcade.distanceBetween(playState.player, r) && game.physics.arcade.distanceBetween(playState.player, r) < 180) {
				r.chasePlayer()
			} else {
				r.stopEnemy();
			};
			if (55 > game.physics.arcade.distanceBetween(playState.player, r) && r.animations.currentAnim.name != 'death')  {
				takeDamage();
				// enemy.animations.play('attack');
			};
		})
	}

	// enemy.readyToAttack = function() {
		// if (55 > game.physics.arcade.distanceBetween(playState.player, this)) {
		// 	enemy.attack();
		// };
	// }
	// enemy.attack = function() {
	// 	if (self.cooldown < game.time.time) {
	// 		playState.player.health -= 10;
	// 		self.cooldown =game.time.time += 2000;
	// 		console.log(playState.player.health)
	// 	}
	// }
	enemy.stopEnemy = function() {
		playState.mob.children.forEach(function(r){
			r.body.velocity.x = r.body.velocity.y = 0
		})
	}
	enemy.death = function() {
		if (this.health <= 0) {
			this.animations.play('death');
			this.body.enable = false;
			this.dead = true;
		}

	}
	enemy.takeDamage = function() {
		if (this.invincible < game.time.time) {
			this.health -= 5;
			// console.log(this.health + ' ratHP');
			this.invincible = game.time.time += 1000;
		}
	}
	return enemy;
};

function collideRat(player, rat){
	// console.log('hit rat');
	playState.player.stopPlayer();
	rat.stopEnemy();
	rat.takeDamage();
}

function takeDamage() {
	if (cooldown < game.time.time) {
		playState.player.health -=5;
		cooldown = game.time.time += 2000
		// console.log(playState.player.health + " playerHP");
	}	
}

function checkScore() {
	score = 0
	playState.mob.children.forEach(function(e) {
		if (e.animations.currentAnim.name == 'death') {
			score = score + 1
		}
	})
}