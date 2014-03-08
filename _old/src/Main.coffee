$ ->
	ww = $(window).width()
	hh = $(window).height()
	new Main ww, hh, 1000/25

class Main extends AppBase
	constructor: (w, h, fps) ->
		super w, h, fps

		@mouse = new Vector @CANVAS_WIDTH/2, @CANVAS_HEIGHT/2
		@people = []
		@theUndead = []
		$("canvas").click (e) => @onCanvasClick e
		
		# create characters
		@hero = new Hero @CANVAS_WIDTH/2, @CANVAS_HEIGHT/2
		@theUndead.push @hero
		for i in [1..200]
			businessMan = new BusinessMan Math.random() * @CANVAS_WIDTH, Math.random() * @CANVAS_HEIGHT
			businessMan.maxSpeed = Math.random()*20
			@people.push businessMan

		# create render list
		@renderObjects = @people.slice()
		@renderObjects.push @hero

		do @startGameLoop

	update: (modifier) ->
		@hero.update @mouse
		for person in @people
			person.update @hero.position

		# peopleBitten = []
		# for zombie in @theUndead
		# 	for person in @people
		# 		if person.isUndead then continue
		# 		if zombie.boid.isCollidingWith person.boid.position
		# 			person.isUndead = true
		# 			peopleBitten.push person
					
		# @turnToZombies peopleBitten

	turnToZombies: (peopleBitten) ->
		for person in peopleBitten
			@people.slice @people.indexOf(person), 1
			@theUndead.push person
			person.isUndead = true	

	render: ->
		do @clearCanvas
		@renderObjects.sort (a, b) -> (parseFloat a.position.y) - (parseFloat b.position.y)
		for i in @renderObjects
			i.render @context

	onCanvasClick: (e) ->
		@mouse.x = e.pageX - $("canvas").offset().left
		@mouse.y = e.pageY - $("canvas").offset().top


