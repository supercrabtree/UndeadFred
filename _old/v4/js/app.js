// Generated by CoffeeScript 1.3.3
(function() {
  var AppBase, Boid, BusinessMan, Character, Graphics, Hero, Main, Vector,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AppBase = (function() {

    function AppBase(CANVAS_WIDTH, CANVAS_HEIGHT, FPS) {
      this.CANVAS_WIDTH = CANVAS_WIDTH;
      this.CANVAS_HEIGHT = CANVAS_HEIGHT;
      this.FPS = FPS;
      this.gameLoop = __bind(this.gameLoop, this);

      window.CANVAS_WIDTH = this.CANVAS_WIDTH;
      window.CANVAS_HEIGHT = this.CANVAS_HEIGHT;
      this.buildCanvas();
    }

    AppBase.prototype.startGameLoop = function() {
      return this.gameLoopInterval = setInterval(this.gameLoop, this.FPS);
    };

    AppBase.prototype.stopGameLoop = function() {
      return clearInterval(this.gameLoopInterval);
    };

    AppBase.prototype.update = function(modifier) {};

    AppBase.prototype.render = function() {};

    AppBase.prototype.clearCanvas = function() {
      return this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    };

    AppBase.prototype.gameLoop = function() {
      var delta, now;
      now = Date.now();
      delta = now - this.before;
      this.update(delta / 1000);
      this.render();
      return this.before = now;
    };

    AppBase.prototype.buildCanvas = function(w, h) {
      this.canvas = $("canvas")[0];
      this.context = this.canvas.getContext("2d");
      this.canvas.width = this.CANVAS_WIDTH;
      return this.canvas.height = this.CANVAS_HEIGHT;
    };

    return AppBase;

  })();

  Boid = (function() {

    function Boid(x, y, boundRect) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      this.boundRect = boundRect != null ? boundRect : null;
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
      var circleMiddle, wanderFor ce;
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

    Boid.prototype.checkForEdges = function() {
      if (this.position.equals(this.lastPosition)) {
        return;
      }
      if (this.boundRect.l > this.position.x) {
        this.position.x = this.boundRect.l;
        this.velocity.multiply(-1);
        this.wanderAngle += 180;
      }
      if (this.position.x > this.boundRect.r) {
        this.position.x = this.boundRect.r;
        this.velocity.multiply(-1);
        this.wanderAngle += 180;
      }
      if (this.boundRect.t > this.position.y) {
        this.position.y = this.boundRect.t;
        this.velocity.multiply(-1);
        this.wanderAngle += 180;
      }
      if (this.position.y > this.boundRect.b) {
        this.position.y = this.boundRect.b;
        this.velocity.multiply(-1);
        return this.wanderAngle += 180;
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

    return Boid;

  })();

  Character = (function() {

    function Character() {
      var graphicsUrls, x, y;
      x = arguments[0], y = arguments[1], graphicsUrls = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      this.graphics = new Graphics(graphicsUrls);
      this.boid = new Boid(x, y);
      this.boid.boundRect = {
        l: 7,
        r: window.CANVAS_WIDTH - 7,
        t: 30,
        b: window.CANVAS_HEIGHT
      };
      this.position = this.boid.position;
    }

    Character.prototype.render = function(context) {
      var g;
      if (this.graphics.ready) {
        if (this.boid.position.x < this.boid.lastPosition.x) {
          if (this.isUndead) {
            g = this.graphics["deadleft"];
          } else {
            g = this.graphics["left"];
          }
        } else {
          if (this.isUndead) {
            g = this.graphics["deadright"];
          } else {
            g = this.graphics["right"];
          }
        }
        return context.drawImage(g, this.boid.position.x - g.width / 2, this.boid.position.y - g.height);
      }
    };

    return Character;

  })();

  BusinessMan = (function(_super) {

    __extends(BusinessMan, _super);

    function BusinessMan(x, y) {
      var img1, img2, img3, img4;
      img1 = {
        name: "left",
        url: "img/business-man.png"
      };
      img2 = {
        name: "right",
        url: "img/business-man-flipped.png"
      };
      img3 = {
        name: "deadleft",
        url: "img/business-man-dead.png"
      };
      img4 = {
        name: "deadright",
        url: "img/business-man-flipped-dead.png"
      };
      BusinessMan.__super__.constructor.call(this, x, y, img1, img2, img3, img4);
      this.boid.maxSpeed = 2;
      this.boid.maxForce = 2;
      this.boid.wanderAngle = Math.random() * 360;
      this.fleeAmmount = 150 - Math.random() * 40;
      this.wanderRadius = 10;
      this.wandeerChange = 0.2;
      this.wanderLength = 0.5;
    }

    BusinessMan.prototype.update = function(heroPosition) {
      if (this.isUndead) {
        this.boid.arrive(heroPosition);
        this.boid.wander();
      } else {
        this.boid.flee(heroPosition, this.fleeAmmount);
        this.boid.wander(10, 0.2, 0.5);
      }
      return this.boid.update();
    };

    return BusinessMan;

  })(Character);

  Graphics = (function() {

    function Graphics(incoming) {
      var i, obj, _i, _len,
        _this = this;
      this.ready;
      this.count = 0;
      for (_i = 0, _len = incoming.length; _i < _len; _i++) {
        obj = incoming[_i];
        i = this[obj.name] = new Image;
        i.onload = function() {
          if (++_this.count === incoming.length) {
            return _this.ready = true;
          }
        };
        i.src = obj.url;
      }
    }

    return Graphics;

  })();

  Hero = (function(_super) {

    __extends(Hero, _super);

    function Hero(x, y) {
      var img1, img2;
      img1 = {
        name: "deadleft",
        url: "img/hero.png"
      };
      img2 = {
        name: "deadright",
        url: "img/hero-flipped.png"
      };
      Hero.__super__.constructor.call(this, x, y, img1, img2);
      this.isUndead = true;
      this.boid.maxSpeed = 5;
    }

    Hero.prototype.update = function(mouse) {
      this.boid.arrive(mouse);
      return this.boid.update();
    };

    return Hero;

  })(Character);

  $(function() {
    var hh, ww;
    ww = $(window).width();
    hh = $(window).height();
    return new Main(ww, hh, 1000 / 25);
  });

  Main = (function(_super) {

    __extends(Main, _super);

    function Main(w, h, fps) {
      var businessMan, i, _i,
        _this = this;
      Main.__super__.constructor.call(this, w, h, fps);
      this.mouse = new Vector(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
      this.people = [];
      this.theUndead = [];
      $("canvas").click(function(e) {
        return _this.onCanvasClick(e);
      });
      this.hero = new Hero(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
      this.theUndead.push(this.hero);
      for (i = _i = 1; _i <= 200; i = ++_i) {
        businessMan = new BusinessMan(Math.random() * this.CANVAS_WIDTH, Math.random() * this.CANVAS_HEIGHT);
        businessMan.maxSpeed = Math.random() * 20;
        this.people.push(businessMan);
      }
      this.renderObjects = this.people.slice();
      this.renderObjects.push(this.hero);
      this.startGameLoop();
    }

    Main.prototype.update = function(modifier) {
      var person, _i, _len, _ref, _results;
      this.hero.update(this.mouse);
      _ref = this.people;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        person = _ref[_i];
        _results.push(person.update(this.hero.position));
      }
      return _results;
    };

    Main.prototype.turnToZombies = function(peopleBitten) {
      var person, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = peopleBitten.length; _i < _len; _i++) {
        person = peopleBitten[_i];
        this.people.slice(this.people.indexOf(person), 1);
        this.theUndead.push(person);
        _results.push(person.isUndead = true);
      }
      return _results;
    };

    Main.prototype.render = function() {
      var i, _i, _len, _ref, _results;
      this.clearCanvas();
      this.renderObjects.sort(function(a, b) {
        return (parseFloat(a.position.y)) - (parseFloat(b.position.y));
      });
      _ref = this.renderObjects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i.render(this.context));
      }
      return _results;
    };

    Main.prototype.onCanvasClick = function(e) {
      this.mouse.x = e.pageX - $("canvas").offset().left;
      return this.mouse.y = e.pageY - $("canvas").offset().top;
    };

    return Main;

  })(AppBase);

  Vector = (function() {

    function Vector(x, y) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
    }

    Vector.prototype.add = function(vector2) {
      this.x += vector2.x;
      return this.y += vector2.y;
    };

    Vector.prototype.subtract = function(vector2) {
      this.x -= vector2.x;
      return this.y -= vector2.y;
    };

    Vector.prototype.multiply = function(scalar) {
      this.x *= scalar;
      return this.y *= scalar;
    };

    Vector.prototype.divide = function(scalar) {
      this.x /= scalar;
      return this.y /= scalar;
    };

    Vector.prototype.distance = function(vector2) {
      var dx, dy;
      dx = vector2.x - this.x;
      dy = vector2.y - this.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    Vector.prototype.mix = function(vector2, ammount) {
      if (ammount == null) ammount = 0.5;
      this.x = (1 - ammount) * this.x + ammount * vector2.x;
      return this.y = (1 - ammount) * this.y + ammount * vector2.y;
    };

    Vector.prototype.norm = function() {
      var length;
      length = this.length();
      if (length === 0) {
        return new Vector(1);
      } else {
        return this.divide(length);
      }
    };

    Vector.prototype.truncate = function(value) {
      if (this.length() > value) {
        this.norm();
        return this.multiply(value);
      }
    };

    Vector.prototype.isNearlyEqualTo = function(vector2, threshold) {
      if (threshold == null) {
        threshold = 0.1;
      }
      return this.isEqualTo(vector2, threshold);
    };

    Vector.prototype.isEqualTo = function(vector2, threshold) {
      var _ref, _ref1;
      if (threshold == null) {
        threshold = 0;
      }
      if ((vector2.x + threshold < (_ref = this.x) && _ref > vector2.x - threshold) && (vector2.y + threshold < (_ref1 = this.y) && _ref1 > vector2.y - threshold)) {
        return true;
      } else {
        return false;
      }
    };

    Vector.prototype.equals = function(vector2) {
      if (this.x === vector2.x && this.y === vector2.y) {
        return true;
      } else {
        return false;
      }
    };

    Vector.prototype.zero = function() {
      return this.multiply(0);
    };

    Vector.prototype.isZero = function() {
      if (this.x === 0 && this.y === 0) {
        return true;
      } else {
        return false;
      }
    };

    Vector.prototype.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    Vector.prototype.angle = function() {
      return Math.atan2(this.y, this.x);
    };

    Vector.prototype.dot = function(vector2) {
      return this.x * vector2.x + this.y * vector2.y;
    };

    Vector.prototype.setLength = function(value) {
      var a;
      a = this.angle();
      this.x = Math.cos(a) * value;
      this.y = Math.sin(a) * value;
      if (Math.abs(this.x < 0.00000001)) {
        this.x = 0;
      }
      if (Math.abs(this.y < 0.00000001)) {
        return this.y = 0;
      }
    };

    Vector.prototype.setAngle = function(value) {
      var len;
      len = this.length();
      this.x = Math.cos(value) * len;
      return this.y = Math.sin(value) * len;
    };

    Vector.add = function(a, b) {
      return new Vector(a.x + b.x, a.y + b.y);
    };

    Vector.subtract = function(a, b) {
      return new Vector(a.x - b.x, a.y - b.y);
    };

    Vector.multiply = function(a, scalar) {
      return new Vector(a.x * scalar, a.y * scalar);
    };

    Vector.divide = function(a, scalar) {
      return new Vector(a.x / scalar, a.y / scalar);
    };

    Vector.mix = function(a, b, ammount) {
      if (ammount == null) ammount = 1;
      var x = (1 - ammount) * a.x + ammount * b.x;
      var y = (1 - ammount) * a.y + ammount * b.y;
      return new Vector(x, y);
    };

    Vector.prototype.copy = function(vector2) {
      this.x = vector2.x;
      return this.y = vector2.y;
    };

    Vector.prototype.clone = function() {
      return new Vector(this.x, this.y);
    };

    Vector.prototype.toString = function() {
      return "x:" + this.x + ", y:" + this.y;
    };

    return Vector;

  })();

}).call(this);
