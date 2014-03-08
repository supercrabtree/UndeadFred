var Boid = (function() {
  function Boid(x,y,maxSpeed,maxForce,boundRect){
    this.position = new Vector(x||0, y||0);
    this.maxSpeed = maxSpeed||1;
    this.maxForce = maxForce||5;
    this.boundRect = boundRect;

    this.velocity = new Vector;
    this.acceleration = new Vector;
    this.lastPosition = new Vector;
    this.wanderAngle = 0;
  };

  Boid.prototype.wander = function(wanderRadius, wanderChange, wanderLength) {
    if (wanderRadius == null) wanderRadius = 20;
    if (wanderChange == null) wanderChange = 0.3;
    if (wanderLength == null) wanderLength = 1;

    var circleMiddle = this.velocity.clone().norm().multiply(wanderRadius);
    var wanderForce = new Vector().setLength(wanderLength).setAngle(this.wanderAngle);
    this.wanderAngle += Math.random() * wanderChange - wanderChange * .5;
    circleMiddle.add(wanderForce);
    this.applyForce(wanderForce);
  };

  Boid.prototype.applyForce = function(force) {
    this.acceleration.add(force);
  };

  Boid.prototype.update = function() {
    this.lastPosition.copy(this.position);
    this.velocity.add(this.acceleration).truncate(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.zero();
    if (this.boundRect) return this.checkForEdges();
  };

  Boid.prototype.checkForEdges = function() {
    if (this.position.equals(this.lastPosition)) {
      return;
    }
    if (this.position.x < this.boundRect[0] ) {
      this.position.x = this.boundRect[0];
      this.velocity.multiply(-1);
      this.wanderAngle += 180;
    }
    if (this.position.x > this.boundRect[2]) {
      this.position.x = this.boundRect[2];
      this.velocity.multiply(-1);
      this.wanderAngle += 180;
    }
    if (this.position.y < this.boundRect[1] ) {
      this.position.y = this.boundRect[1];
      this.velocity.multiply(-1);
      this.wanderAngle += 180;
    }
    if (this.position.y > this.boundRect[3]) {
      this.position.y = this.boundRect[3];
      this.velocity.multiply(-1);
      this.wanderAngle += 180;
    }
  };

  Boid.prototype.toString = function(){
    return "x:" + this.position.x + ", y:" + this.position.y;
  };
  return Boid;
})();

















/*var Boid = (function() {
    function Boid(x, y, boundRect) {
      if (x == null) x = 0;
      if (y == null) y = 0;
      this.boundRect = boundRect;
      this.maxSpeed = 10;
      this.maxForce = 5;
      this.velocity = new Vector;
      this.lastPosition = new Vector;
      this.acceleration = new Vector;
      this.position = new Vector(x, y);
      this.wanderAngle = 0;
    }

    Boid.prototype.update = function() {
      this.lastPosition.copy(this.position);
      this.velocity.add(this.acceleration);
      this.velocity.truncate(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.zero();
      if (this.boundRect) {
        return this.checkForEdges();
      }
    };

    Boid.prototype.applyForce = function(force) {
      return this.acceleration.add(force);
    };

    Boid.prototype.wander = function(wanderRadius, wanderChange, wanderLength) {
      var circleMiddle, wanderForce;
      if (wanderRadius == null) {
        wanderRadius = 10;
      }
      if (wanderChange == null) {
        wanderChange = 1;
      }
      if (wanderLength == null) {
        wanderLength = 2.5;
      }
      circleMiddle = this.velocity.clone();
      circleMiddle.norm();
      circleMiddle.multiply(wanderRadius);
      wanderForce = new Vector;
      wanderForce.setLength(wanderLength);
      wanderForce.setAngle(this.wanderAngle);
      this.wanderAngle += Math.random() * wanderChange - wanderChange * .5;
      circleMiddle.add(wanderForce);
      return this.applyForce(wanderForce);
    };

    Boid.prototype.arrive = function(target, slowingDistance) {
      var desired, distance, steer;
      if (slowingDistance == null) {
        slowingDistance = 20;
      }
      desired = Vector.subtract(target, this.position);
      distance = desired.length();
      if (distance > slowingDistance) {
        return this.seek(target);
      } else {
        desired.norm();
        desired.multiply(this.maxSpeed * distance / slowingDistance);
        steer = Vector.subtract(desired, this.velocity);
        steer.truncate(this.maxForce);
        return this.applyForce(steer);
      }
    };

    Boid.prototype.seek = function(target) {
      var desired, steer;
      desired = Vector.subtract(target, this.position);
      desired.norm();
      desired.multiply(this.maxSpeed);
      steer = Vector.subtract(desired, this.velocity);
      steer.truncate(this.maxForce);
      return this.applyForce(steer);
    };

    Boid.prototype.flee = function(target, threshold) {
      var desired, steer;
      if (threshold == null) {
        threshold = 50;
      }
      if ((this.position.distance(target)) > threshold) {
        return this.velocity.multiply(0.99);
      } else {
        this.wanderAngle += 0.5;
        desired = Vector.subtract(target, this.position);
        desired.norm();
        desired.multiply(this.maxSpeed);
        desired.multiply(-1);
        steer = Vector.subtract(desired, this.velocity);
        steer.truncate(this.maxForce);
        return this.applyForce(steer);
      }
    };


    Boid.prototype.isCollidingWith = function(vector, threshold) {
      if (threshold == null) {
        threshold = 10;
      }
      if ((Vector.subtract(this.position, vector)).length() < threshold) {
        return true;
      } else {
        return false;
      }
    };

    Boid.prototype.persuit = function(target) {
      var distance, p, t, v;
      distance = this.position.distance(target);
      t = distance / this.maxSpeed;
      v = this.velocity.clone();
      p = this.position.clone();
      v.multiply(t);
      p.add(v);
      return this.seek(p);
    };

    Boid.prototype.evade = function(target, threshold) {
      var distance, p, t, v;
      if (threshold == null) {
        threshold = 50;
      }
      distance = this.position.distance(target);
      t = distance / this.maxSpeed;
      v = this.velocity.clone();
      p = this.position.clone();
      v.multiply(t);
      return p.add(v);
    };

    Boid.prototype.toString = function(){
      return "x:" + this.x + ", y:" + this.y;
    }

    return Boid;
  })();*/