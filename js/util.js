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
    getAddress: function () {
      var mainPin = window.util.MAP.querySelector('.map__pin--main');
      var address = document.querySelector('#address');
      var left = parseInt(getComputedStyle(mainPin).getPropertyValue('left'), 10);
      var top = parseInt(getComputedStyle(mainPin).getPropertyValue('top'), 10);

      address.value = left + window.util.pinParams.indentX + ' ' + top;
    },
    debounce: function (debouncedFunction) {
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        debouncedFunction();
      }, 1000);
    },
    getInfoContainer: function (message) {
      var container = document.createElement('div');
      container.style = 'z-index: 999; margin: 0 auto; text-align: center; background-color: tomato;';
      container.style.position = 'fixed';
      container.style.left = 0;
      container.style.right = 0;
      container.style.fontSize = '25px';
      container.style.color = 'white';
      container.textContent = message;
      return container;
    },
    removeContainer: function (container) {
      window.setTimeout(function () {
        container.parentNode.removeChild(container);
      }, 5000);
    }
  };
}());
