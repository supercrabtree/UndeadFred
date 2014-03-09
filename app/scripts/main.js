'use strict';

(function (Boid, Vector) {
  var canvas = document.getElementById('canvas')
    , content = canvas.getContext('2d');

  function draw() {
    
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', function (e) {
    resizeCanvas();
  }, false);

  resizeCanvas();

  var title = '#t1|#t2|#t3|#t4|#t5|#t6|#t7|#t8|#t9|#t10|#t11|'.split('|');
  TweenMax.staggerFrom(title, 1, {alpha: 0, y: '50', scaleX: 0, scaleY: 0, ease: Power4.easeOut, delay: 1}, 0.03);

})(Boid, Vector);