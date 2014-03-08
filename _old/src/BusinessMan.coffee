class BusinessMan extends Character
	constructor: (x, y) ->
		img1 = name:"left", url:"img/business-man.png"
		img2 = name:"right", url:"img/business-man-flipped.png"
		img3 = name:"deadleft", url:"img/business-man-dead.png"
		img4 = name:"deadright", url:"img/business-man-flipped-dead.png"
		super x, y, img1, img2, img3, img4
		@boid.maxSpeed = 2
		@boid.maxForce = 2
		@boid.wanderAngle = Math.random()*360	
		@fleeAmmount = 150 - Math.random()*40
		@wanderRadius = 10
		@wandeerChange = 0.2
		@wanderLength = 0.5

	update: (heroPosition) ->
		if @isUndead
			@boid.arrive heroPosition
			@boid.wander()
		else
			@boid.flee heroPosition, @fleeAmmount
			@boid.wander(10, 0.2, 0.5)
		@boid.update()