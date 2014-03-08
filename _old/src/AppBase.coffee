class AppBase
	constructor: (@CANVAS_WIDTH, @CANVAS_HEIGHT, @FPS) ->
		window.CANVAS_WIDTH = @CANVAS_WIDTH
		window.CANVAS_HEIGHT = @CANVAS_HEIGHT

		do @buildCanvas

	startGameLoop: ->
		@gameLoopInterval = setInterval @gameLoop, @FPS

	stopGameLoop: ->
		clearInterval @gameLoopInterval

	update: (modifier) ->
		
	render: ->

	clearCanvas: ->
		@context.clearRect 0, 0, @CANVAS_WIDTH, @CANVAS_HEIGHT

	gameLoop: =>
		now = do Date.now
		delta = now - @before
		@update delta / 1000
		do @render
		@before = now

	buildCanvas: (w, h) ->
		@canvas = $("canvas")[0]
		@context = @canvas.getContext "2d"
		@canvas.width = @CANVAS_WIDTH
		@canvas.height = @CANVAS_HEIGHT




