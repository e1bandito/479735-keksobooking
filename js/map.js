'use strict';

(function () {

  var mapParams = {
    LEFT: window.util.pinParams.pinWidth / 2,
    RIGHT: window.util.MAP.clientWidth - window.util.pinParams.pinWidth / 2,
    TOP: window.util.LOCATION_AREA.MIN_Y,
    BOTTOM: window.util.LOCATION_AREA.MAX_Y
  };
  var i = 0;

  var getFragmentWithPins = function (array) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(window.pin.renderPin(item));
    });
    mapPins.appendChild(fragment);
  };

  var getErrorMessage = function (message) {
    var container = document.createElement('div');
    container.style = 'z-index: 999; margin: 0 auto; text-align: center; background-color: tomato;';
    container.style.position = 'absolute';
    container.style.left = 0;
    container.style.right = 0;
    container.style.fontSize = '25px';
    container.style.color = 'white';

    container.textContent = message;
    document.body.insertAdjacentElement('afterbegin', container);
  };

  document.querySelector('.map__pin--main').addEventListener('mouseup', function () {
    var map = window.util.MAP;
    var noticeForm = document.querySelector('.notice__form--disabled');
    map.classList.remove('map--faded');
    if (noticeForm) {
      noticeForm.classList.remove('notice__form--disabled');
    }
    window.backend.load(getFragmentWithPins, getErrorMessage);
    var fieldsets = document.querySelectorAll('fieldset');
    for (i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  });

  // ---------------------------- Перетаскивание -------------------------------

  var mainPin = window.util.MAP.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (currentCoords.y < mapParams.TOP) {
        currentCoords.y = mapParams.TOP;
      }

      if (currentCoords.y > mapParams.BOTTOM) {
        currentCoords.y = mapParams.BOTTOM;
      }

      if (currentCoords.x < mapParams.LEFT) {
        currentCoords.x = mapParams.LEFT;
      }

      if (currentCoords.x > mapParams.RIGHT) {
        currentCoords.x = mapParams.RIGHT;
      }

      mainPin.style.top = (currentCoords.y) + 'px';
      mainPin.style.left = (currentCoords.x) + 'px';

      var address = document.querySelector('#address');
      address.value = currentCoords.x + window.util.pinParams.indentX + ' ' + currentCoords.y;
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

}());
