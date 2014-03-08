class Boid
	constructor: (x=0, y=0, @boundRect=null) ->
		@maxSpeed = 10
		@maxForce = 5
		@velocity = new Vector
		@lastPosition = new Vector
		@acceleration = new Vector
		@position = new Vector x, y
		@wanderAngle = 0

	update: ->
    	@lastPosition.copy @position
    	@velocity.add @acceleration
    	@velocity.truncate @maxSpeed
    	@position.add @velocity
    	@acceleration.zero()
    	if @boundRect then @checkForEdges()
	
	applyForce: (force) ->
		@acceleration.add force

	wander: (wanderRadius=10, wanderChange=1, wanderLength=2.5) ->
		circleMiddle = @velocity.clone()
		circleMiddle.norm()
		circleMiddle.multiply wanderRadius
		wanderForce = new Vector
		wanderForce.setLength wanderLength
		wanderForce.setAngle @wanderAngle
		@wanderAngle += Math.random() * wanderChange - wanderChange * .5
		circleMiddle.add wanderForce
		@applyForce wanderForce

	arrive: (target, slowingDistance=20) ->
		desired = Vector.subtract target, @position
		distance = desired.length()
		if distance > slowingDistance then @seek target
		else
			desired.norm()
			desired.multiply @maxSpeed * distance/slowingDistance
			steer = Vector.subtract desired, @velocity
			steer.truncate @maxForce
			@applyForce steer

	seek: (target) ->
		desired = Vector.subtract target, @position
		desired.norm();
		desired.multiply @maxSpeed
		steer = Vector.subtract desired, @velocity
		steer.truncate @maxForce
		@applyForce steer

	flee: (target, threshold=50) ->
		if (@position.distance target) > threshold
			@velocity.multiply 0.99
		else
			@wanderAngle += 0.5
			desired = Vector.subtract target, @position
			desired.norm();
			desired.multiply @maxSpeed
			desired.multiply -1
			steer = Vector.subtract desired, @velocity
			steer.truncate @maxForce
			@applyForce steer

	checkForEdges: ->
		if @position.equals @lastPosition then return
		if @boundRect.l > @position.x # is hitting left
		 	@position.x = @boundRect.l
		 	@velocity.multiply -1
		 	@wanderAngle += 180
		if @position.x > @boundRect.r # is hitting right
			@position.x = @boundRect.r 
			@velocity.multiply -1
			@wanderAngle += 180
		if @boundRect.t > @position.y # is hitting top
			@position.y = @boundRect.t
			@velocity.multiply -1
			@wanderAngle += 180
		if @position.y > @boundRect.b # is hitting bottom
			@position.y = @boundRect.b
			@velocity.multiply -1
			@wanderAngle += 180
							
	isCollidingWith: (vector, threshold=10) ->
		if (Vector.subtract @position, vector).length() < threshold then true else false

	persuit: (target) ->
		# meh
		distance = @position.distance target
		t = distance / @maxSpeed
		v = @velocity.clone()
		p = @position.clone()
		v.multiply t
		p.add v
		@seek p

	evade: (target, threshold=50) ->
		#meh
		distance = @position.distance target
		t = distance / @maxSpeed
		v = @velocity.clone()
		p = @position.clone()
		v.multiply t
		p.add v




