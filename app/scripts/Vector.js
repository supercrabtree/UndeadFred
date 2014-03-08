var Vector = (function() {
	function Vector(x, y){
		this.x = x || 0;
		this.y = y || 0;
	};

	Vector.prototype.add = function(vector2) {
		this.x += vector2.x;
		this.y += vector2.y;
		return this;
	};

	Vector.prototype.subtract = function(vector2) {
		this.x -= vector2.x;
		this.y -= vector2.y;
		return this;
	};

	Vector.prototype.multiply = function(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};

	Vector.prototype.divide = function(scalar) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	};

	Vector.prototype.distance = function(vector2) {
		var dx = vector2.x - this.x;
		var dy = vector2.y - this.y;
		return Math.sqrt(dx * dx + dy * dy);
	};

	Vector.prototype.mix = function(vector2, ammount) {
		if (ammount == null) ammount = 0.5;
		this.x = (1 - ammount) * this.x + ammount * vector2.x;
		this.y = (1 - ammount) * this.y + ammount * vector2.y;
		return this;
	};

	Vector.prototype.norm = function() {
		if (this.length() === 0) {
			x = 1;
			y = 0;
		} else {
			this.divide(this.length());
		}
		return this;
	};

	Vector.prototype.truncate = function(value) {
		if (this.length() > value) {
			this.norm();
			this.multiply(value);
		}
		return this;
	};

	Vector.prototype.isNearlyEqualTo = function(vector2, threshold) {
		if (threshold == null) {
			threshold = 0.1;
		}
		return this.isEqualTo(vector2, threshold);
	};

	Vector.prototype.isEqualTo = function(vector2, threshold) {
		if (threshold == null) threshold = 0;
		if ((vector2.x + threshold < this.x && this.x > vector2.x - threshold) && (vector2.y + threshold < this.y && this.y > vector2.y - threshold)) {
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
		this.multiply(0);
		return this;
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
		var a = this.angle();
		this.x = Math.cos(a) * value;
		this.y = Math.sin(a) * value;
		if (Math.abs(this.x < 0.00000001)) {
			this.x = 0;
		}
		if (Math.abs(this.y < 0.00000001)) {
			this.y = 0;
		}
		return this;
	};

	Vector.prototype.setAngle = function(value) {
		var len = this.length();
		this.x = Math.cos(value) * len;
		this.y = Math.sin(value) * len;
		return this;
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
		if (ammount == null) ammount = 0.5;
		var x = (1 - ammount) * a.x + ammount * b.x;
		var y = (1 - ammount) * a.y + ammount * b.y;
		return new Vector(x, y);
	};

	Vector.prototype.copy = function(vector2) {
		this.x = vector2.x;
		this.y = vector2.y;
		return this;
	};

	Vector.prototype.clone = function() {
		return new Vector(this.x, this.y);
	};

	Vector.prototype.toString = function() {
		return "x:" + this.x + ", y:" + this.y;
	};

	return Vector;
})();