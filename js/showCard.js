'use strict';

(function () {
  window.showCard = function (activeElement, filtersContainer) {
    var map = document.querySelector('.map');
    var mapCardActive = document.querySelector(window.util.MAP_CARD);
    mapCardActive = window.getAdvertCard(window.adverts[window.pinsArray.indexOf(activeElement)]);
    map.insertBefore(mapCardActive, filtersContainer);
    return mapCardActive;
  };
}());
