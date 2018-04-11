var titleState = {
	layer: null,
	create: function (){
		var map = game.add.tilemap('room1');
		map.addTilesetImage('tiles1', 'tiles1');
		this.layer = map.createLayer('floor');
		this.layer = map.createLayer('walls');
		var instructions = game.add.text(game.world.centerX, 150, 'Using your mouse, click to move and attack pesky rats.', {
			font: '20px Space Mono', 
			fill: '#ffffff', 
			align: 'center'
		})
		var instructions2 = game.add.text(game.world.centerX, 200, 'Kill as many as possible before you are overrun.', {
			font: '20px Space Mono', 
			fill: '#ffffff', 
			align: 'center'
		})
		var beginPlay = game.add.text(game.world.centerX, 250, 'click anywhere to start', {
			font: '14px Space Mono', 
			fill: '#ffffff', 
			align: 'center'
		});
		instructions.anchor.setTo(.5, .5);
		instructions2.anchor.setTo(.5, .5);
		beginPlay.anchor.setTo(.5, .5);
		game.input.activePointer.capture = true;
	},
	update: function(){
		if (game.input.activePointer.isDown) {
			game.state.start('play');
		}
	}
};