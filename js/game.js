var game = new Phaser.Game(736, 512 , Phaser.AUTO, null, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('play', playState);
game.state.add('gameOver', gameOver);

game.state.start('boot');