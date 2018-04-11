// console.log('load.js linked');

var loadState={
	preload: function(){
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'})
	
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizontally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		// load graphics assets. (given name of spritesheet, location, height/width of individual asset)
		game.load.spritesheet('warrior', 'assets/sprites/warriorsprite.png', 12, 15);
		game.load.spritesheet('rat', 'assets/sprites/rat.png', 16, 15)
		game.load.tilemap('room1', 'assets/maps/firstroom.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles1', 'assets/sprites/tiles1.png');
		// load audio assets 

	},
	create: function(){
		game.state.start('title');
	}
};