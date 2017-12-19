'use strict';

(function () {
  window.util = {
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
