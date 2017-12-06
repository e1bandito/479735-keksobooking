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
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MAP_CARD = '.map__card';
var MAP_PIN_ACTIVE = 'map__pin--active';
var MAP_PIN_ACTIVE_CLASS = '.map__pin--active';
var lastTitle = 0;
var i = 0;

var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var filtersContainer = document.querySelector('map__filters-container');

var map = document.querySelector('.map');

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
  for (i = 0; i < ADVERTS_COUNT; i++) {
    advertsArray.push(advertGenerate());
  }
  return advertsArray;
};

var adverts = createAdverts();

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
for (i = 0; i < ADVERTS_COUNT; i++) {
  fragment.appendChild(pinsArray[i]);
}

// Добавляет фрагмент на страницу
var mapPins = map.querySelector('.map__pins');

// Наполняет карту контентом
var getAdvertCard = function (currentAdvert) {
  var card = cardTemplate.cloneNode(true);
  var cardTitle = card.querySelector('.map__card--title');
  var cardAddress = card.querySelector('.map__card--address');
  var cardPrice = card.querySelector('.popup__price');
  var cardType = card.querySelector('.map__card--type');
  var cardRooms = card.querySelector('.map__card--rooms');
  var cardTime = card.querySelector('.map__card--time');
  var cardFeatures = card.querySelector('.popup__features');
  var cardDescription = card.querySelector('.map__card--description');
  var userAvatar = card.querySelector('.popup__avatar');

  var checkFeatures = function (featureList) {
    while (featureList.hasChildNodes()) {
      featureList.removeChild(featureList.lastChild);
    }
    for (i = 0; i < currentAdvert.offer.features.length; i++) {
      var li = document.createElement('li');
      var liClass = 'feature--' + currentAdvert.offer.features[i];
      li.classList.add('feature', liClass);
      featureList.appendChild(li);
    }
    return featureList;
  };

  var getRoomsAndGuests = function () {
    var roomsDict = {
      'default': 'комнаты',
      '1': 'комната',
      '5': 'комнат'
    };
    var guestsPostfix = currentAdvert.offer.guests === 1 ? 'гостя' : 'гостей';
    var roomsPostfix = roomsDict[currentAdvert.offer.rooms] || roomsDict.default;
    return currentAdvert.offer.rooms + ' ' + roomsPostfix + ' для ' + currentAdvert.offer.guests + ' ' + guestsPostfix;
  };

  cardTitle.textContent = currentAdvert.offer.title;
  cardAddress.textContent = currentAdvert.offer.address;
  cardPrice.textContent = currentAdvert.offer.price + '\t\u20BD/ночь';
  cardType.textContent = HOUSE_TYPES[currentAdvert.offer.type];
  cardRooms.textContent = getRoomsAndGuests();
  cardTime.textContent = 'Заезд после ' + currentAdvert.offer.checkin + ', ' + 'выезд до ' + currentAdvert.offer.checkout;
  checkFeatures(cardFeatures);
  cardDescription.textContent = currentAdvert.offer.description;
  userAvatar.src = currentAdvert.author.avatar;
  return card;
};

// ------------------------- Обработка событий ---------------------------------

var onPopupClick = function (evt) {
  var closeButton = evt.target;
  var mapPinActive = document.querySelector(MAP_PIN_ACTIVE_CLASS);
  var mapCardActive = map.querySelector(MAP_CARD);
  if (closeButton.classList.contains('popup__close') && mapCardActive) {
    mapPinActive.classList.remove(MAP_PIN_ACTIVE);
    mapCardActive.classList.add('hidden');
  }
};

var onPinClick = function (evt) {
  var mapPinActive = document.querySelector(MAP_PIN_ACTIVE_CLASS);
  if (mapPinActive) {
    mapPinActive.classList.remove(MAP_PIN_ACTIVE);
  }
  var mapCardActive = map.querySelector('.map__card');
  var activeElement = evt.target;
  if (activeElement.tagName === 'IMG') {
    activeElement = activeElement.parentElement;
  }
  if (activeElement.classList.contains('map__pin')) {
    activeElement.classList.add(MAP_PIN_ACTIVE);
    if (pinsArray.indexOf(activeElement) !== -1) {
      if (mapCardActive) {
        map.removeChild(mapCardActive);
      }
      mapCardActive = getAdvertCard(adverts[pinsArray.indexOf(activeElement)]);
      map.insertBefore(mapCardActive, filtersContainer);
      mapCardActive.addEventListener('click', onPopupClick);
      document.querySelector('.map__pins').addEventListener('keydown', onPopupEscClose);
    }
  }
};

var onPopupEscClose = function (evt) {
  var activeElement = evt.target;
  var mapCardActive = map.querySelector(MAP_CARD);
  if (evt.keyCode === ESC_KEYCODE && mapCardActive) {
    activeElement.classList.remove(MAP_PIN_ACTIVE);
    map.removeChild(mapCardActive);
    document.querySelector('.map__pins').removeEventListener('keydown', onPopupEscClose);
  }
};

var onPopupEnterPress = function (evt) {
  var activeElement = document.querySelector('.popup__close');
  var mapPinActive = document.querySelector(MAP_PIN_ACTIVE_CLASS);
  if (activeElement === evt.target) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapPinActive.classList.remove(MAP_PIN_ACTIVE_CLASS);
    }
  }
};

document.querySelector('.map__pin--main').addEventListener('mouseup', function () {
  var noticeForm = document.querySelector('.notice__form--disabled');
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  mapPins.appendChild(fragment);
  var fieldsets = document.querySelectorAll('fieldset');
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
});

document.querySelector('.map__pins').addEventListener('click', onPinClick);

document.querySelector('.map__pins').addEventListener('click', onPopupClick);

document.querySelector('.map__pins').addEventListener('keydown', onPopupEscClose);

document.querySelector('.map__pins').addEventListener('keydown', onPopupEnterPress);

// -----------------------------------------------------------------------------
