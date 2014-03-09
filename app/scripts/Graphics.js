'use strict';

var Graphics = (function () {

  var that;
  var numGraphicsToLoad = 0;
  var count = 0;

  function Graphics(incoming) {
    that = this;
    this.isReady = false;

    for (var arg in incoming) {
      var img = this[arg] = new Image();
      img.onload = onImageLoaded;
      img.src = incoming[arg];
      numGraphicsToLoad++;
    }
  }

  function onImageLoaded() {
    if (++count === numGraphicsToLoad) {
      that.isReady = true;
    }
  }

  return Graphics;
})();