class Vector
	constructor: (@x=0, @y=0) ->

	add: (vector2) ->
		@x += vector2.x
		@y += vector2.y

	subtract: (vector2) ->
		@x -= vector2.x
		@y -= vector2.y

	multiply: (scalar) ->
		@x *= scalar
		@y *= scalar

	divide: (scalar) ->
		@x /= scalar
		@y /= scalar

	distance: (vector2) ->
		dx = vector2.x - @x;
		dy = vector2.y - @y;
		Math.sqrt dx * dx + dy * dy;

	mix: (vector2, ammount=1) ->
		@x = (1 - ammount) * @x + ammount * vector2.x
		@y = (1 - ammount) * @y + ammount * vector2.y
		
	norm: ->
		length = do @length
		if length is 0 then new Vector 1
		else @divide length

	truncate: (value) ->
		if @length() > value
			do @norm
			@multiply value

	isNearlyEqualTo: (vector2, threshold=0.1) ->
		@isEqualTo vector2, threshold

	isEqualTo: (vector2, threshold=0) ->
		if vector2.x + threshold < @x > vector2.x - threshold and
		vector2.y + threshold < @y > vector2.y - threshold
		then true
		else false

	equals: (vector2) ->
		if @x is vector2.x and @y is vector2.y then true else false

	zero: ->
		@multiply 0

	isZero: ->
		if @x is 0 and @y is 0 then true else false

	# return numbers
	length: ->
		Math.sqrt @x * @x + @y * @y

	angle: ->
		Math.atan2 @y, @x
		
	dot: (vector2) ->
		@x * vector2.x + @y * vector2.y

	setLength: (value) ->
		a = @angle()
		@x = Math.cos(a) * value
		@y = Math.sin(a) * value
		if Math.abs @x < 0.00000001 then @x = 0
		if Math.abs @y < 0.00000001 then @y = 0

	setAngle: (value) ->
		len = @length()
		@x = Math.cos(value) * len
		@y = Math.sin(value) * len


	# return vectors
	@add: (a, b) ->
		new Vector a.x + b.x, a.y + b.y

	@subtract: (a, b) ->
		new Vector a.x - b.x, a.y - b.y

	@multiply: (a, scalar) ->
		new Vector a.x * scalar, a.y * scalar

	@divide: (a, scalar) ->
		new Vector a.x / scalar, a.y / scalar

	@mix: (a, b, ammount=1) ->
		x = (1 - ammount) * a.x + ammount * b.x
		y = (1 - ammount) * a.y + ammount * b.y
		new Vector x, y

	# utility functions
	copy: (vector2) ->
		@x = vector2.x
		@y = vector2.y

	clone: ->
		new Vector @x, @y

	toString: ->
		"x:#{@x}, y:#{@y}"



