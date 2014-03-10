'use strict';

(function () {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var engine = new SimpleGameEngine(60, context, canvas);

  var businessMen = [];
  var fred;

  function init() {
    window.addEventListener('resize', function (e) {
      resizeCanvas();
    });
    resizeCanvas();
    // stops ios dragging
    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    });

    // grab the main title and canvas, animate in
    var title = '#t1|#t2|#t3|#t4|#t5|#t6|#t7|#t8|#t9|#t10|#t11|'.split('|');
    TweenMax.staggerFrom(title, 0.5, {alpha: 0, y: '+=100', scaleX: 0, scaleY: 0, ease: Power4.easeOut, delay: 1}, 0.03);
    TweenMax.from(canvas, 1, {alpha: 0, y: '+=10', ease: Power4.easeOut, delay: 1});

    createGameCharacters();
    engine.start();
  }

  function createGameCharacters() {
    fred = new Character(window.innerWidth / 2, window.innerHeight / 2, {left: '/images/fred-left.png', right: '/images/fred-right.png'});
    fred.isUndead = true;
    engine.addGameObject(fred);

    for (var i = 0; i < 40; i++) {
      var randomX = window.innerWidth * Math.random();
      var randomY = window.innerHeight * Math.random();
      var businessMan = new Character(randomX, randomY, {left: '/images/business-man-left.png', right: '/images/business-man-right.png'});
      engine.addGameObject(businessMan);
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  init();
})();














