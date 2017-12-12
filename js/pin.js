'use strict';
(function () {
  var i = 0;

  var getPinsArray = function () {
    var renderPin = function (advert) {

      var pin = document.createElement('button');
      var avatar = document.createElement('img');
      pin.classList.add('map__pin');
      pin.style.left = advert.location.x - window.util.pinParams.indentX + 'px';
      pin.style.top = advert.location.y - window.util.pinParams.indentY + 'px';
      avatar.src = advert.author.avatar;
      avatar.width = window.util.pinParams.pinWidth;
      avatar.height = window.util.pinParams.pinHeight;
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
