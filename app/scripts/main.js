'use strict';

(function (Boid, Vector) {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d');

  var title = '#t1|#t2|#t3|#t4|#t5|#t6|#t7|#t8|#t9|#t10|#t11|'.split('|');
  var fred = new Character(400, 400, {left: '/images/fred-left.png', right: 'images/fred-right.png'});

  function init() {
    window.addEventListener('resize', function (e) {
      resizeCanvas();
    });
    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    });

    resizeCanvas();

    TweenMax.staggerFrom(title, 0.5, {alpha: 0, y: '+=100', scaleX: 0, scaleY: 0, ease: Power4.easeOut, delay: 1}, 0.03);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setTimeout(function () {
    fred.render(context);
  }, 100);

  init();
})(Boid, Vector);