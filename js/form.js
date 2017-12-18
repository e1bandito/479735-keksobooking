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

  var MAX_PRICE = '1000000';

  var HOUSE_TYPES = ['bungalo', 'flat', 'house', 'palace'];

  var MIN_PRICES = [0, 1000, 5000, 10000];

  var CHECK_TIMES = ['12:00', '13:00', '14:00'];

  var TITLE_LENGTH = {
    MIN_LENGTH: 30,
    MAX_LENGTH: 100
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

  var getAddress = function () {
    var mainPin = window.util.MAP.querySelector('.map__pin--main');
    var address = document.querySelector('#address');
    var left = parseInt(getComputedStyle(mainPin).getPropertyValue('left'), 10);
    var top = parseInt(getComputedStyle(mainPin).getPropertyValue('top'), 10);

    address.value = left + window.util.pinParams.indentX + ' ' + top;
  };

  var onSuccess = function () {
    form.reset();
    getAddress();
  };

  var getErrorMessage = function (message) {
    var container = document.createElement('div');
    container.style = 'z-index: 999; margin: 0 auto; text-align: center; background-color: tomato;';
    container.style.position = 'absolute';
    container.style.left = 0;
    container.style.right = 0;
    container.style.fontSize = '25px';
    container.style.color = 'white';

    container.textContent = message;
    document.body.insertAdjacentElement('afterbegin', container);
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, CHECK_TIMES, CHECK_TIMES, syncValues);
  });

  typeHouseSelect.addEventListener('change', function () {
    window.synchronizeFields(typeHouseSelect, housePrice, HOUSE_TYPES, MIN_PRICES, syncValueWithMin);
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
    var roomsCountValue = roomsCount.value;
    guestsCount.value = (roomsCountValue === '100') ? '0' : roomsCountValue;

    while (guestsCount.firstChild) {
      guestsCount.removeChild(guestsCount.firstChild);
    }

    getOptions(OPTIONS[roomsCountValue]);
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
      housePrice.setCustomValidity('Не может превышать ' + MAX_PRICE);
    }
  });

  advertTitle.addEventListener('invalid', function () {
    advertTitle.setCustomValidity('');
    if (advertTitle.validity.tooShort) {
      advertTitle.setCustomValidity('Заголовок должен содержать не менее ' + TITLE_LENGTH.MIN_LENGTH + ' символов.');
    }
    if (advertTitle.validity.tooLong) {
      advertTitle.setCustomValidity('Длина заголовка не должна превышать ' + TITLE_LENGTH.MAX_LENGTH + ' символов');
    }
    if (advertTitle.validity.valueMissing) {
      advertTitle.setCustomValidity('Пожалуйста, добавьте заголовок');
    }
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, getErrorMessage);
    evt.preventDefault();
  });
})();
