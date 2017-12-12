'use strict';

(function () {
//  var MAP = document.querySelector('.map');
  var MAP_PIN_ACTIVE = 'map__pin--active';
  var MAP_PIN_ACTIVE_CLASS = '.map__pin--active';
  var mapParams = {
    LEFT: window.util.pinParams.pinWidth / 2,
    RIGHT: window.util.MAP.clientWidth - window.util.pinParams.pinWidth / 2,
    TOP: window.util.LOCATION_AREA.MIN_Y,
    BOTTOM: window.util.LOCATION_AREA.MAX_Y
  };
  var i = 0;

  var getFragmentWithPins = function () {
    var fragment = document.createDocumentFragment();
    for (i = 0; i < window.util.ADVERTS_COUNT; i++) {
      fragment.appendChild(window.pinsArray[i]);
    }
    return fragment;
  };

  var onPopupClick = function (evt) {
    var map = window.util.MAP;
    var closeButton = evt.target;
    var mapPinActive = document.querySelector(MAP_PIN_ACTIVE_CLASS);
    var mapCardActive = map.querySelector(window.util.MAP_CARD);
    if (closeButton.classList.contains('popup__close') && mapCardActive) {
      mapPinActive.classList.remove(MAP_PIN_ACTIVE);
      mapCardActive.classList.add('hidden');
    }
  };

  var onPinClick = function (evt) {
    var map = window.util.MAP;
    var filtersContainer = document.querySelector('map__filters-container');
    var mapPinActive = document.querySelector(MAP_PIN_ACTIVE_CLASS);
    if (mapPinActive) {
      mapPinActive.classList.remove(MAP_PIN_ACTIVE);
    }
    var mapCardActive = map.querySelector(window.util.MAP_CARD);
    var activeElement = evt.target;
    if (activeElement.tagName === 'IMG') {
      activeElement = activeElement.parentElement;
    }
    if (activeElement.classList.contains('map__pin')) {
      activeElement.classList.add(MAP_PIN_ACTIVE);
      if (window.pinsArray.indexOf(activeElement) !== -1) {
        if (mapCardActive) {
          map.removeChild(mapCardActive);
        }
        mapCardActive = window.showCard(activeElement, filtersContainer);
        mapCardActive.addEventListener('click', onPopupClick);
        document.querySelector('.map__pins').addEventListener('keydown', onPopupEscClose);
      }
    }
  };

  var onPopupEscClose = function (evt) {
    var map = window.util.MAP;
    var activeElement = evt.target;
    var mapCardActive = map.querySelector(window.util.MAP_CARD);
    if (evt.keyCode === window.util.ESC_KEYCODE && mapCardActive) {
      activeElement.classList.remove(MAP_PIN_ACTIVE);
      map.removeChild(mapCardActive);
      document.querySelector('.map__pins').removeEventListener('keydown', onPopupEscClose);
    }
  };

  var onPopupEnterPress = function (evt) {
    var activeElement = document.querySelector('.popup__close');
    var mapPinActive = document.querySelector(MAP_PIN_ACTIVE_CLASS);
    if (activeElement === evt.target) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        mapPinActive.classList.remove(MAP_PIN_ACTIVE_CLASS);
      }
    }
  };

  document.querySelector('.map__pin--main').addEventListener('mouseup', function () {
    var map = window.util.MAP;
    var noticeForm = document.querySelector('.notice__form--disabled');
    var mapPins = map.querySelector('.map__pins');
    map.classList.remove('map--faded');
    if (noticeForm) {
      noticeForm.classList.remove('notice__form--disabled');
    }
    mapPins.appendChild(getFragmentWithPins());
    var fieldsets = document.querySelectorAll('fieldset');
    for (i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  });

  document.querySelector('.map__pins').addEventListener('click', onPinClick);

  document.querySelector('.map__pins').addEventListener('click', onPopupClick);

  document.querySelector('.map__pins').addEventListener('keydown', onPopupEscClose);

  document.querySelector('.map__pins').addEventListener('keydown', onPopupEnterPress);

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
