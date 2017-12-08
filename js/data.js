'use strict';

(function () {
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TYPES = [
    'flat',
    'house',
    'bungalo'
  ];

  var FEATURES_LIST = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var MIN_FEATURES_COUNT = 1;

  var ROOMS_COUNT = {
    MIN: 1,
    MAX: 5
  };

  var PRICE_COUNT = {
    MIN: 1000,
    MAX: 1000000
  };

  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];

  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];

  var userIndex = 0;
  var MAX_GUESTS = 10;

  var LOCATION_AREA = {
    MIN_X: 300,
    MAX_X: 900,
    MIN_Y: 100,
    MAX_Y: 500
  };

  var lastTitle = 0;
  var i = 0;

  var getUserAvatar = function () {
    var beginPath = 'img/avatars/user0';
    var endPath = '.png';
    if (userIndex < window.util.ADVERTS_COUNT) {
      userIndex++;
      return beginPath + userIndex + endPath;
    } else {
      return 'img/avatars/default.png';
    }
  };

  var getTitle = function () {
    var title = TITLES[lastTitle];
    lastTitle++;
    return title;
  };

  var getTypeOfHouse = function () {
    var typeIndex = window.util.getRandomElement(TYPES);
    return typeIndex;
  };

  var getCheckInTime = function () {
    var typeIndex = window.util.getRandomElement(CHECKIN_TIMES);
    return typeIndex;
  };

  var getCheckOutTime = function () {
    var typeIndex = window.util.getRandomElement(CHECKOUT_TIMES);
    return typeIndex;
  };

  var randomSort = function () {
    return Math.random() - 0.5;
  };

  var getFeaturesList = function () {
    var featuresArrayCopy = FEATURES_LIST.slice();
    featuresArrayCopy.sort(randomSort);
    var featuresCount = window.util.getNumberFromRange(MIN_FEATURES_COUNT, FEATURES_LIST.length);
    return featuresArrayCopy.slice(0, featuresCount);
  };

  var advertGenerate = function () {
    var advert = {
      author: {
        avatar: getUserAvatar()
      },

      offer: {
        title: getTitle(),
        address: '',
        price: window.util.getNumberFromRange(PRICE_COUNT.MIN, PRICE_COUNT.MAX),
        type: getTypeOfHouse(),
        rooms: window.util.getNumberFromRange(ROOMS_COUNT.MIN, ROOMS_COUNT.MAX),
        guests: window.util.getNumberFromRange(0, MAX_GUESTS),
        checkin: getCheckInTime(),
        checkout: getCheckOutTime(),
        features: getFeaturesList(),
        description: '',
        photos: []
      },

      location: {
        x: window.util.getNumberFromRange(LOCATION_AREA.MIN_X, LOCATION_AREA.MAX_X),
        y: window.util.getNumberFromRange(LOCATION_AREA.MIN_Y, LOCATION_AREA.MAX_Y)
      }
    };
    advert.offer.address = advert.location.x + ' ' + advert.location.y;
    return advert;
  };

  var createAdverts = function () {
    var advertsArray = [];
    for (i = 0; i < window.util.ADVERTS_COUNT; i++) {
      advertsArray.push(advertGenerate());
    }
    return advertsArray;
  };

  window.adverts = createAdverts();
})();
