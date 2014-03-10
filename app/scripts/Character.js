'use strict';

var Character = (function () {

  function Character(x, y, graphicsConfig) {
    this.boid = new Boid(x, y);
    this.graphics = new Graphics(graphicsConfig);
    this.isUndead = false;
  }

  Character.prototype.update = function () {

  };

  Character.prototype.render = function (context) {
    if (!this.graphics.isReady) {
      return;
    }
    var g;
    if (this.boid.position.x < this.boid.lastPosition.x) {
      g = this.graphics.left;
    } else {
      g = this.graphics.right;
    }
    context.drawImage(g, this.boid.position.x - g.width / 2, this.boid.position.y - g.height);
  };

  return Character;
})();