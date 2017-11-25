'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPES = ['flat', 'house', 'bungalo'];

var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var ROOMS_COUNT ={
  MIN: 1,
  MAX: 5
};

var PRICE_COUNT ={
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
  MIN_Y: 300,
  MAX_Y: 900
};

var ADVERTS_COUNT = 8;
var lastTitle = 0;

var getNumberFromRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getUserAvatar = function () {
  var beginPath = 'img/avatars/user0';
  var endPath = '.png';
  if (userIndex < ADVERTS_COUNT) {
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
  var typeIndex = getNumberFromRange(0, TYPES.length - 1);
  return TYPES[typeIndex];
};

var getCheckInTime = function () {
  var checkInIndex = getNumberFromRange(0, CHECKIN_TIMES.length - 1);
  return CHECKIN_TIMES[checkInIndex];
};

var getCheckOutTime = function () {
  var checkOutIndex = getNumberFromRange(0, CHECKOUT_TIMES.length - 1);
  return CHECKOUT_TIMES[checkOutIndex];
};

function getFeaturesList() {
  var featuresArrayLength = getNumberFromRange(1, FEATURES_LIST.length);
  var featuresArray = [];
  var arrayOfIndexes = [];

  for (var i = 0; i < FEATURES_LIST.length; i++) {
    arrayOfIndexes.push(i);
  }

  for (var j = 0; j < featuresArrayLength; j++) {
    var randomIndex = arrayOfIndexes[getNumberFromRange(0, arrayOfIndexes.length - 1)];
    featuresArray.push(FEATURES_LIST[randomIndex]);
    arrayOfIndexes.splice(arrayOfIndexes.indexOf(randomIndex), 1);
  }
  return featuresArray;
}

var advertGenerate = function () {
  var advert = {
    author: {
      avatar: getUserAvatar()
    },

    offer: {
      title: getTitle(),
      address: '',
      price: getNumberFromRange(PRICE_COUNT.MIN, PRICE_COUNT.MAX),
      type: getTypeOfHouse(),
      rooms: getNumberFromRange(ROOMS_COUNT.MIN, ROOMS_COUNT.MAX),
      guests: getNumberFromRange(0, MAX_GUESTS),
      checkin: getCheckInTime(),
      checkout: getCheckOutTime(),
      features: getFeaturesList(),
      description: '',
      photos: []
    },

    location: {
      x: getNumberFromRange(LOCATION_AREA.MIN_X, LOCATION_AREA.MAX_X),
      y: getNumberFromRange(LOCATION_AREA.MIN_Y, LOCATION_AREA.MAX_Y)
    }
  };
  advert.offer.address = advert.location.x + ' ' + advert.location.y;
  return advert;
};

var createAdverts = function () {
  var advertsArray = [];
  for (var k = 0; k < ADVERTS_COUNT; k++) {
    advertsArray.push(advertGenerate());
  }
  return advertsArray;
};

console.log(createAdverts());

var map = document.querySelector('.map');
map.classList.remove('map--faded');
