'use strict';

(function () {
  var PriceValue = {
    MIN: 10000,
    MAX: 50000
  };

  var priceOptions = {
    'low': function (price) {
      return price < PriceValue.MIN;
    },
    'middle': function (price) {
      return price > PriceValue.MIN && price < PriceValue.MAX;
    },
    'high': function (price) {
      return price >= PriceValue.MAX;
    }
  };

  var priceFilter = function (array, value) {
    return array.filter(function (it) {
      return priceOptions[value](it.offer.price);
    });
  };

  var valueFilter = function (array, value, type) {
    return array.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var featuresFilter = function (array, feature) {
    return array.filter(function (it) {
      return it.offer.features.indexOf(feature) !== -1;
    });
  };

  window.filterPins = function (defaultArray) {
    var filters = document.querySelectorAll('.map__filter');
    var activeFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var filtersSelect = Array.from(filters).filter(function (filter) {
      return filter.value !== 'any';
    });

    var modifedArray = defaultArray.slice();

    filtersSelect.forEach(function (item) {
      var type = item.name.split('-')[1];
      modifedArray = (type === 'price') ? priceFilter(modifedArray, item.value) : valueFilter(modifedArray, item.value, type);
    });

    activeFeatures.forEach(function (item) {
      modifedArray = featuresFilter(modifedArray, item.value);
    });

    return modifedArray;
  };
})();
