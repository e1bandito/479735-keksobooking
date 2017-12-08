'use strict';

(function () {
  var MAP_PIN_ACTIVE = 'map__pin--active';
  var MAP_PIN_ACTIVE_CLASS = '.map__pin--active';
  var i = 0;

  var getFragmentWithPins = function () {
    var fragment = document.createDocumentFragment();
    for (i = 0; i < window.util.ADVERTS_COUNT; i++) {
      fragment.appendChild(window.pinsArray[i]);
    }
    return fragment;
  };

  var onPopupClick = function (evt) {
    var map = document.querySelector('.map');
    var closeButton = evt.target;
    var mapPinActive = document.querySelector(MAP_PIN_ACTIVE_CLASS);
    var mapCardActive = map.querySelector(window.util.MAP_CARD);
    if (closeButton.classList.contains('popup__close') && mapCardActive) {
      mapPinActive.classList.remove(MAP_PIN_ACTIVE);
      mapCardActive.classList.add('hidden');
    }
  };

  var onPinClick = function (evt) {
    var map = document.querySelector('.map');
    var filtersContainer = document.querySelector('map__filters-container');
    var mapPinActive = document.querySelector(MAP_PIN_ACTIVE_CLASS);
    if (mapPinActive) {
      mapPinActive.classList.remove(MAP_PIN_ACTIVE);
    }
    var mapCardActive = map.querySelector('.map__card');
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
        mapCardActive = window.getAdvertCard(window.adverts[window.pinsArray.indexOf(activeElement)]);
        map.insertBefore(mapCardActive, filtersContainer);
        mapCardActive.addEventListener('click', onPopupClick);
        document.querySelector('.map__pins').addEventListener('keydown', onPopupEscClose);
      }
    }
  };

  var onPopupEscClose = function (evt) {
    var map = document.querySelector('.map');
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
    var map = document.querySelector('.map');
    var noticeForm = document.querySelector('.notice__form--disabled');
    var mapPins = map.querySelector('.map__pins');
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
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
}());
