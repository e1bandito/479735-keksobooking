'use strict';

(function () {
  window.util = {
    getNumberFromRange: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    getRandomNumber: function (max) {
      return Math.floor(Math.random() * max);
    },
    getRandomElement: function (array) {
      var randomIndex = window.util.getRandomNumber(array.length);
      return array[randomIndex];
    },
//    ADVERTS_COUNT: 8,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    MAP: document.querySelector('.map'),
    MAP_CARD: '.map__card',
    LOCATION_AREA: {
      MIN_X: 300,
      MAX_X: 900,
      MIN_Y: 100,
      MAX_Y: 650
    },
    pinParams: {
      pinWidth: 40,
      pinHeight: 40,
      indentX: 40 / 2,
      indentY: 40
    }
  };
}());
