###Do you like smashing rats? Well boy do I have the game for you.

##Objective
	
Smash as many rats as possible before your health reaches 0, enemy rats touching you will damage you over
time!

##Controlls

Move - Mouse point and left click  
Attack - Point at nearby enemy and left click


##The Making Of Rat Smasher

This was supposed to be a pixel dungeon clone, with a player character moving through a series of rooms defeating various enemies and looking for the exit to the next floor. But that turned to be far, far, too ambitious for a six day project (having learned javascript basics only a week earlier). So here we have Rat Smasher Deluxe 2.0. 

I started creating a player character who could move around. Originally I had a keyboard arrow key movement based character and that was all fine and dandy but creating directional hit boxes for attacking based on movement seemed daunting so I scrapped keyboard movement and remade the players movement with mouse inputs.  I then moved on to having a background imported through Tiled. That turned to be a huge sink of time too and I may have lost more time trying to figure out how to properly import the tilemaps I created than if I had found some other way to construct my map. In the end I didn't even end up finding out how to properly set my walls tile layer with colision to the player. Then I set up the functions to handle player and enemy having health and attacking eachother. There I spent the majority of my time. I still can't figure out how to make seperate enemies have their own attack / cooldown onto the player. If he's mobbed by three or so people right now he just takes attacks as if he had one enemy nearby.

If I had more time the first things I would do are get some audio files added and some correctly implement attacking logic between the player and enemies. Right now it's kind of hacked together in a very ugly way. Smashing rats isn't quite as fun without some good sound effects and smooth attack animations. I would also find out how to make Tiled tilemaps have collision with the player so I could easily make more maps and have transitions into other rooms which hold different enemies. That's really the tip of the iceberg. I'd also like to add different player classes, entire inventory systems, leveled skills, interactive environment, enemy/boss variety, saving game progress, ect ect ect. Then there's the whole wow this looks like hot garbage from the 90's web page design that could be worked on. 

##Bugs

If you're surrounded by multiple enemies you still only get hit at the same rate as if you're fighting a single enemy.  
Walls act functionally as floor, no collision detection for player character and walls.  
If too many enemies spawn on the screen they will all stop, I've only seen that once.  

##To Do

Add audio and animation to attacks from player character and enemies so player clearly understands rate of attack.  
Add basic power up items via dead rat loot:  
- Health Potions  
- Stronger Attacks  
- Invincibility  
- Speedier Movement  
Implement local storage scoreboard.  
Fix listed bugs.  
Enemy variety.  


Built using Phaser 2.10.3. and Tiled 1.1.4