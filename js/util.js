'use strict';

(function () {
  window.util = {
    MAP: document.querySelector('.map'),
    MAP_CARD: '.map__card',
    pinParams: {
      pinWidth: 40,
      pinHeight: 40,
      indentX: 40 / 2,
      indentY: 40
    },
    debounce: function (debouncedFunction) {
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        debouncedFunction();
      }, 1000);
    }
  };
}());
