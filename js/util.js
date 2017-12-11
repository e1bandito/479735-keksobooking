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
    ADVERTS_COUNT: 8,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    MAP_CARD: '.map__card'
  };
}());
