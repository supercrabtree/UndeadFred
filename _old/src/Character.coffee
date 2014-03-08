class Character
	constructor: (x, y, graphicsUrls...) ->
		@graphics = new Graphics graphicsUrls
		@boid = new Boid x, y
		@boid.boundRect =
			l:7
			r:window.CANVAS_WIDTH - 7
			t:30
			b:window.CANVAS_HEIGHT
		@position = @boid.position

	render: (context) ->
		if @graphics.ready
			if @boid.position.x < @boid.lastPosition.x
				if @isUndead then g = @graphics["deadleft"]
				else g = @graphics["left"]
			else
				if @isUndead then g = @graphics["deadright"]
				else g = @graphics["right"]
			
			context.drawImage g, @boid.position.x - g.width/2, @boid.position.y - g.height
