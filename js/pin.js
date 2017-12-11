'use strict';
(function () {
  var i = 0;

  var getPinsArray = function () {
    var renderPin = function (advert) {
      var pinWidth = 40;
      var pinHeight = 40;
      var indent = {
        x: pinWidth / 2,
        y: pinHeight
      };

      var pin = document.createElement('button');
      var avatar = document.createElement('img');
      pin.classList.add('map__pin');
      pin.style.left = advert.location.x - indent.x + 'px';
      pin.style.top = advert.location.y - indent.y + 'px';
      avatar.src = advert.author.avatar;
      avatar.width = pinWidth;
      avatar.height = pinHeight;
      pin.appendChild(avatar);
      return pin;
    };

    var pinsArray = [];
    for (i = 0; i < window.adverts.length; i++) {
      pinsArray.push(renderPin(window.adverts[i]));
    }
    return pinsArray;
  };

  window.pinsArray = getPinsArray();
})();
