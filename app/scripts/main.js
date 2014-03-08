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


})(Boid, Vector);