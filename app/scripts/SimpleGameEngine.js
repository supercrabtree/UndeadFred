'use strict';

var SimpleGameEngine = (function () {

  var self;

  function SimpleGameEngine(fps, context, canvas) {
    self = this;
    this.fps = fps;
    this.context = context;
    this.canvas = canvas;
    this.gameLoopInterval;
    this.gameObjects = [];
  }

  SimpleGameEngine.prototype.start = function () {
    setInterval(this.gameLoop, this.fps);
  };

  SimpleGameEngine.prototype.stop = function () {
    clearInterval(this.gameLoopInterval);
  };

  SimpleGameEngine.prototype.update = function () {
    for (var i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].update();
    }
  };

  SimpleGameEngine.prototype.render = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].render(this.context);
    }
  };

  SimpleGameEngine.prototype.gameLoop = function () {
    self.update();
    self.render();
  };

  SimpleGameEngine.prototype.addGameObject = function (gameObject) {
    this.gameObjects.push(gameObject);
  };

  return SimpleGameEngine;
})();