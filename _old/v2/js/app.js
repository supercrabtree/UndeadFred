
	console.log('one')
	$(function(){

		var zombie
		var lastMouseClickPosition

		var onCanvasClick = function(e){
			console.log("there")
			lastMouseClickPosition.x = e.pageX - $("canvas").offset().left
			lastMouseClickPosition.y = e.pageY - $("canvas").offset().top
			console.log(lastMouseClickPosition.x)
		}
		jaws.start({
			setup: function(){
				var _this = this
				jaws.unpack()
				jaws.assets.add(["img/hero.png", "img/hero-flipped.png"])
				jaws.assets.add(["img/business-man.png", "img/business-man-flipped.png"])
				jaws.assets.add(["img/business-man-dead.png", "img/business-man-dead-flipped.png"])
				zombie = new Sprite({image:"img/hero.png", x:jaws.width/2, y:jaws.width/2, scale:2, anchor:"bottom"})
				console.log("aht")
				$("game-canvas").click(function(e){
					console.log("here")
					_this.onCanvasClick(e)
				})
			},
			update: function(){
				
			},
			draw: function(){
				jaws.clear()
				// draw background
				jaws.context.fillStyle = "black"
				jaws.context.rect(0,0,jaws.width,jaws.height)
				jaws.context.fill()

				zombie.draw()
			}
		})

	})