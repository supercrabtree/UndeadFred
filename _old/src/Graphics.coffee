class Graphics
	constructor: (incoming) ->
		@ready
		@count = 0
		for obj in incoming
			i = @[obj.name] = new Image
			i.onload = => if ++@count is incoming.length then @ready = true
			i.src = obj.url