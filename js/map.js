'use strict';

(function () {
  var PINS_COUNT = 5;
  var LocationArea = {
    MIN_Y: 100,
    MAX_Y: 650
  };

  var mapParams = {
    LEFT: window.util.pinParams.pinWidth / 2,
    RIGHT: window.util.MAP.clientWidth - window.util.pinParams.pinWidth / 2,
    TOP: LocationArea.MIN_Y,
    BOTTOM: LocationArea.MAX_Y
  };

  var i = 0;
  var pinsList = document.querySelector('.map__pins');
  var pinsArray = [];

  var getFragment = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(window.pin.renderPin(item));
    });
    return fragment;
  };

  var getFragmentWithPins = function (array) {
    pinsArray = array;
    var finalPinsArray = pinsArray.slice(PINS_COUNT);
    pinsList.appendChild(getFragment(finalPinsArray));
  };

  var removePins = function (parent) {
    var pinsToRemove = parent.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsToRemove.forEach(function (currentPin) {
      parent.removeChild(currentPin);
    });
  };

  var renderPinsOnMap = function () {
    var filteredPins = window.filterPins(pinsArray);
    var map = window.util.MAP;
    var mapCardActive = document.querySelector(window.util.MAP_CARD);

    removePins(pinsList);
    if (mapCardActive) {
      map.removeChild(mapCardActive);
    }
    if (filteredPins.length > PINS_COUNT) {
      var finalFilteredPins = filteredPins.slice(PINS_COUNT);
      pinsList.appendChild(getFragment(finalFilteredPins));
    } else {
      pinsList.appendChild(getFragment(filteredPins));
    }
  };

  var filters = document.querySelector('.map__filters');

  filters.addEventListener('change', function () {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      renderPinsOnMap();
    }, 1000);
  });

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
      window.backend.load(getFragmentWithPins, getErrorMessage);
    }
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
