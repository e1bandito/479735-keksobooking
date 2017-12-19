'use strict';

(function () {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var onPinClick = function (evt, object) {
    var activePin = document.querySelector('.map__pin--active');

    if (activePin) {
      window.pin.removeActivePin(activePin);
    }

    evt.currentTarget.classList.add('map__pin--active');
    window.showCard(object);
  };

  window.pin = {
    renderPin: function (advert) {
      var pin = pinTemplate.cloneNode(true);
      var pinAvatar = pin.querySelector('img');
      pin.style.left = advert.location.x - window.util.pinParams.indentX + 'px';
      pin.style.top = advert.location.y - window.util.pinParams.indentY + 'px';
      pinAvatar.setAttribute('src', advert.author.avatar);

      pin.addEventListener('click', function (evt) {
        onPinClick(evt, advert);
      });

      return pin;
    },

    removeActivePin: function (activeElement) {
      activeElement.classList.remove('map__pin--active');
    }
  };
})();
