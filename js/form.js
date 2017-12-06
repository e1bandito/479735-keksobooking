'use strict';

(function () {

  var NO_GUESTS = {
    value: 0,
    text: 'не для гостей'
  };

  var SINGLE_GUEST = {
    value: 1,
    text: 'для 1 гостя'
  };

  var DOUBLE_GUESTS = {
    value: 2,
    text: 'для 2 гостей'
  };

  var TRIPLE_GUESTS = {
    value: 3,
    text: 'для 3 гостей'
  };

  var OPTIONS = {
    100: [NO_GUESTS],
    1: [SINGLE_GUEST],
    2: [DOUBLE_GUESTS, SINGLE_GUEST],
    3: [TRIPLE_GUESTS, DOUBLE_GUESTS, SINGLE_GUEST]
  };

  var minPriceOfHouses = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var housePrice = form.querySelector('#price');
  var advertTitle = form.querySelector('#title');
  var typeHouseSelect = form.querySelector('#type');
  var roomsCount = form.querySelector('#room_number');
  var guestsCount = form.querySelector('#capacity');
  var i = 0;

  // функция синхронизации полей заезда/выезда
  timeIn.addEventListener('change', function () {
    var firstValue = timeIn.selectedIndex;
    timeOut.selectedIndex = firstValue;
  });

  typeHouseSelect.addEventListener('change', function () {
    var activeValue = typeHouseSelect.value;
    housePrice.setAttribute('min', minPriceOfHouses[activeValue]);
  });

  var getOptions = function (guests) {
    for (i = 0; i < guests.length; i++) {
      var option = document.createElement('option');
      option.value = guests[i].value;
      option.innerHTML = guests[i].text;
      guestsCount.appendChild(option);
    }
  };

  roomsCount.addEventListener('change', function () {
    var firstValue = roomsCount.value;
    guestsCount.value = (firstValue === '100') ? '0' : firstValue;

    while (guestsCount.firstChild) {
      guestsCount.removeChild(guestsCount.firstChild);
    }

    getOptions(OPTIONS[firstValue]);
  });

  housePrice.addEventListener('invalid', function () {
    housePrice.setCustomValidity('');
    if (housePrice.validity.valueMissing) {
      housePrice.setCustomValidity('Введите цену');
    }
    if (housePrice.validity.rangeUnderflow) {
      housePrice.setCustomValidity('Не может стоить меньше ' + housePrice.min);
    }
    if (housePrice.validity.rangeOverflow) {
      housePrice.setCustomValidity('Не может превышать 1 000 000');
    }
  });

  advertTitle.addEventListener('invalid', function () {
    advertTitle.setCustomValidity('');
    if (advertTitle.validity.tooShort) {
      advertTitle.setCustomValidity('Заголовок должен содержать не менее 30 символов.');
    }
    if (advertTitle.validity.tooLong) {
      advertTitle.setCustomValidity('Длина заголовка не должна превышать 100 символов');
    }
    if (advertTitle.validity.valueMissing) {
      advertTitle.setCustomValidity('Пожалуйста, добавьте заголовок');
    }
  });
})();
