// console.log('gameOver.js linked');

var gameOver = {
	layer: null,
	create: function (){

		var map = game.add.tilemap('room1');
		map.addTilesetImage('tiles1', 'tiles1');
		this.layer = map.createLayer('floor');
		this.layer = map.createLayer('walls');
		var nameLabel = game.add.text(game.world.centerX, 100, 'Oh rats, you died...', {
			font: '32px Space Mono', fill: '#ffffff', align: 'center'
		});

		var endScore = game.add.text(game.world.centerX, 200, "At least you managed to take " + score + " rats with you.", {
			font: '32px Space Mono', fill: '#ffffff', align: 'center'
		});
		nameLabel.anchor.setTo(.5, .5);
		endScore.anchor.setTo(.5, .5);

		game.input.activePointer.capture = true;
	},
	update: function(){
		if (game.input.activePointer.isDown) {
			game.state.start('play')
		}
	}
}
