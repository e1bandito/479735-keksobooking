'use strict';

(function () {
  var priceValues = {
    MIN: 10000,
    MAX: 50000
  };

  var priceOptions = {
    'low': function (price) {
      return price < priceValues.MIN;
    },
    'middle': function (price) {
      return price > priceValues.MIN && price < priceValues.MAX;
    },
    'high': function (price) {
      return price >= priceValues.MAX;
    }
  };

  var priceFilter = function (list, value) {
    return list.filter(function (item) {
      return priceOptions[value](item.offer.price);
    });
  };

  var valueFilter = function (list, value, type) {
    return list.filter(function (item) {
      return item.offer[type].toString() === value;
    });
  };

  var featuresFilter = function (list, feature) {
    return list.filter(function (item) {
      return item.offer.features.indexOf(feature) !== -1;
    });
  };

  window.filterPins = function (defaultArray) {
    var filters = document.querySelectorAll('.map__filter');
    var activeFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var filtersSelect = [].slice.call(filters).filter(function (filter) {
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
