'use strict';

(function () {
  var HOUSE_TYPES = {
    flat: 'квартира',
    house: 'дом',
    bungalo: 'бунгало'
  };

  var i = 0;
  var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');

  window.getAdvertCard = function (currentAdvert) {
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

    while (cardFeatures.hasChildNodes()) {
      cardFeatures.removeChild(cardFeatures.lastChild);
    }
    for (i = 0; i < currentAdvert.offer.features.length; i++) {
      var li = document.createElement('li');
      var liClass = 'feature--' + currentAdvert.offer.features[i];
      li.classList.add('feature', liClass);
      cardFeatures.appendChild(li);
    }

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
    cardDescription.textContent = currentAdvert.offer.description;
    userAvatar.src = currentAdvert.author.avatar;
    return card;
  };
})();
