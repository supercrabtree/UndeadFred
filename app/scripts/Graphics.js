'use strict';

var Graphics = (function () {

  function Graphics(incoming) {
    var self = this;
    var numGraphicsToLoad = 0;
    var count = 0;

    this.isReady = false;

    for (var arg in incoming) {
      var img = this[arg] = new Image();
      img.onload = onImageLoaded;
      numGraphicsToLoad++;
      img.src = incoming[arg];
    }

    function onImageLoaded() {
      if (++count === numGraphicsToLoad) {
        self.isReady = true;
      }
    }
  }

  return Graphics;
})();