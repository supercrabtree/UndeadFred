class Hero extends Character
	constructor: (x, y) ->
		img1 = name:"deadleft", url:"img/hero.png"
		img2 = name:"deadright", url:"img/hero-flipped.png"
		super x, y, img1, img2
		@isUndead = true
		@boid.maxSpeed = 5

	update: (mouse) ->
		@boid.arrive mouse
		@boid.update()