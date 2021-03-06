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

  var SUCCESS_MESSAGE = 'Форма успешно отправлена!';

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

  var clearImages = function (elements) {
    elements.forEach(function (item) {
      item.remove();
    });
  };

  var onSuccess = function () {
    form.reset();
    window.util.getAddress();

    var images = document.querySelectorAll('.form__photo-container img');
    var defaultAvatar = 'img/muffin.png';
    var container = window.util.getInfoContainer(SUCCESS_MESSAGE);

    document.body.insertAdjacentElement('afterbegin', container);
    window.imageInserting.avatar(defaultAvatar);
    clearImages(images);
    window.util.removeContainer(container);
  };

  var getErrorMessage = function (message) {
    var container = window.util.getInfoContainer(message);
    document.body.insertAdjacentElement('afterbegin', container);
    window.util.removeContainer(container);
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

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, CHECK_TIMES, CHECK_TIMES, syncValues);
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
