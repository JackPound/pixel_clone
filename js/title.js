console.log('title.js linked');

var titleState = {
	layer: null,


	create: function (){
		
		var map = game.add.tilemap('room1');
		map.addTilesetImage('tiles1', 'tiles1');
		this.layer = map.createLayer('floor');
		this.layer = map.createLayer('walls');
		var nameLabel = game.add.text(175, 150, 'Click anywhere to start', {
			font: '14px Space Mono', fill: '#ffffff'
		});
		game.input.activePointer.capture = true;
		var instructions = game.add.text(50, 50, 'Using your mouse, click to move and attack pesky rats.', {
			font: '20px Space Mono', fill: '#ffffff'
		})
		var instructions2 = game.add.text(50, 100, 'Kill as many as possible before you are overrun.', {
			font: '20px Space Mono', fill: '#ffffff'
		})
	},
	update: function(){
		if (game.input.activePointer.isDown) {
			game.state.start('play')
		}
	}
}
