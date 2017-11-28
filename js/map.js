'use strict';

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

var ROOMS_DICT = {
  'default': 'комнаты',
  '1': 'комната',
  '5': 'комнат'
};

var ROOMS_COUNT = {
  MIN: 1,
  MAX: 5
};

var HOUSE_TYPES = {
  flat: 'квартира',
  house: 'дом',
  bungalo: 'бунгало'
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

var ADVERTS_COUNT = 8;
var lastTitle = 0;

var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var filtersContainer = document.querySelector('map__filters-container');

var card = cardTemplate.cloneNode(true);
var cardTitle = card.querySelector('h3');
var cardAddress = card.querySelector('small');
var cardPrice = card.querySelector('.popup__price');
var cardType = card.querySelector('h4');
var cardRooms = card.querySelector('p:nth-of-type(3)');
var cardTime = card.querySelector('p:nth-of-type(4)');
var cardFeatures = card.querySelector('.popup__features');
var cardDescription = card.querySelector('p:nth-of-type(5)');
var userAvatar = card.querySelector('.popup__avatar');

var getNumberFromRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

var getRandomElement = function (array) {
  var randomIndex = getRandomNumber(array.length);
  return array[randomIndex];
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
  var typeIndex = getRandomElement(TYPES);
  return typeIndex;
};

var getCheckInTime = function () {
  var typeIndex = getRandomElement(CHECKIN_TIMES);
  return typeIndex;
};

var getCheckOutTime = function () {
  var typeIndex = getRandomElement(CHECKOUT_TIMES);
  return typeIndex;
};

var randomSort = function () {
  return Math.random() - 0.5;
};

var getFeaturesList = function () {
  var featuresArrayCopy = FEATURES_LIST.slice();
  featuresArrayCopy.sort(randomSort);
  var featuresCount = getNumberFromRange(MIN_FEATURES_COUNT, FEATURES_LIST.length);
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

var adverts = createAdverts();
var currentAdvert = adverts[0];

var map = document.querySelector('.map');
map.classList.remove('map--faded');


// Генерирует пины
var renderPin = function (advert) {
  var pinWidth = 40;
  var pinHeight = 40;
  var indent = {
    x: pinWidth / 2,
    y: pinHeight
  };

  var pin = document.createElement('button');
  var avatar = document.createElement('img');
  pin.classList.add('map__pin');
  pin.style.left = advert.location.x - indent.x + 'px';
  pin.style.top = advert.location.y - indent.y + 'px';
  avatar.src = advert.author.avatar;
  avatar.width = pinWidth;
  avatar.height = pinHeight;
  pin.appendChild(avatar);
  return pin;
};

// Генерирует массив с DOM элементами пинов
var pinsArray = [];
for (var l = 0; l < adverts.length; l++) {
  pinsArray.push(renderPin(adverts[l]));
}

// Создает фрагмент для пинов
var fragment = document.createDocumentFragment();

// Добавляет в фрагмент пины
for (var m = 0; m < ADVERTS_COUNT; m++) {
  fragment.appendChild(renderPin(adverts[m]));
}

// Добавляет фрагмент на страницу
var mapPins = map.querySelector('.map__pins');

mapPins.appendChild(fragment);

// Передает тип жилья
var getType = function (type) {
  var typeOfHouse = HOUSE_TYPES[type];
  return typeOfHouse;
};

// Передает количество комнат и гостей
var getRoomsAndGuests = function () {
  var guestsEnd = currentAdvert.offer.guests === 1 ? 'гостя' : 'гостей';
  var roomsEnd = ROOMS_DICT[currentAdvert.offer.rooms] || ROOMS_DICT.default;
  return currentAdvert.offer.rooms + ' ' + roomsEnd + ' для ' + currentAdvert.offer.guests + ' ' + guestsEnd;
};

// Передает преимущества
var checkFeatures = function (featureList) {
  while (featureList.hasChildNodes()) {
    featureList.removeChild(featureList.lastChild);
  }
  for (var n = 0; n < currentAdvert.offer.features.length; n++) {
    var li = document.createElement('li');
    li.className = 'feature feature--' + currentAdvert.offer.features[n];
    featureList.appendChild(li);
  }
  return featureList;
};

// Наполняет карту контентом
var advertCard = function () {
  cardTitle.textContent = currentAdvert.offer.title;
  cardAddress.textContent = currentAdvert.offer.address;
  cardPrice.textContent = currentAdvert.offer.price + '\t\u20BD/ночь';
  cardType.textContent = getType(currentAdvert.offer.type);
  cardRooms.textContent = getRoomsAndGuests();
  cardTime.textContent = 'Заезд после ' + currentAdvert.offer.checkin + ', ' + 'выезд до ' + currentAdvert.offer.checkout;
  checkFeatures(cardFeatures);
  cardDescription.textContent = currentAdvert.offer.description;
  userAvatar.src = currentAdvert.author.avatar;
  return card;
};

// Вставляет карту на страницу
map.insertBefore(advertCard(), filtersContainer);
