'use strict';

(function () {
  window.showCard = function (currentAdvert, filtersContainer) {
    var map = document.querySelector('.map');
    var mapCardActive = document.querySelector(window.util.MAP_CARD);
    if (mapCardActive) {
      map.removeChild(mapCardActive);
    }
    mapCardActive = window.getAdvertCard(currentAdvert);
    map.insertBefore(mapCardActive, filtersContainer);
    return mapCardActive;
  };
}());
