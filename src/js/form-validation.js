
'use strict'

function request(argument) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/send', true);

  xhr.send(argument);

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) {
      return;// по окончании запроса доступны:
    }
    // status, statusText
    // responseText, responseXML (при content-type: text/xml)
    if (this.status != 200) {
      // обработать ошибку
      alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
      return;
    }
  }
}

function CustomValidation() { }

CustomValidation.prototype = {
  // Установим пустой массив сообщений об ошибках
  invalidities: [],

  // Метод, проверяющий валидность
  checkValidity: function(input) {

    var validity = input.validity;

    if (validity.patternMismatch) {
      this.addInvalidity('This is the wrong pattern for this field');
    }

    if (validity.rangeOverflow) {
      var max = getAttributeValue(input, 'max');
      this.addInvalidity('The maximum value should be ' + max);
    }

    if (validity.rangeUnderflow) {
      var min = getAttributeValue(input, 'min');
      this.addInvalidity('The minimum value should be ' + min);
    }

    if (validity.stepMismatch) {
      var step = getAttributeValue(input, 'step');
      this.addInvalidity('This number needs to be a multiple of ' + step);
    }

    // И остальные проверки валидности...
  },

  // Добавляем сообщение об ошибке в массив ошибок
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },

  // Получаем общий текст сообщений об ошибках
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  },

  // Сбросим общий текст сообщений об ошибках
  resetInvalidity: function() {
    return this.invalidities.length = 0;
  }
};

CustomValidation.prototype.getInvaliditiesForHTML = function() {
  return this.invalidities.join('. <br>');
}

var submit = document.getElementById('contact-form-submit');

// Добавляем обработчик клика на кнопку отправки формы
submit.addEventListener('click', function(e) {
  var formData  = new FormData(this.form);
  var inputs = [];

  for (var i = 0; i < this.parentElement.length; i++) {
    inputs.push(this.parentElement[i]);

  }
  // Пройдёмся по всем полям
  for (var i = 0; i < inputs.length; i++) {

    var input = inputs[i];
    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() == false) {

      var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
      inputCustomValidation.checkValidity(input); // Выявим ошибки
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке

      // Добавим ошибки в документ
      var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
      // Если поле пустое
      if (!customValidityMessageForHTML) {
        customValidityMessageForHTML ='Required field';
      }
      input.insertAdjacentHTML('afterend', '<p class="page-main__error-message ' + input.name + '">' + customValidityMessageForHTML + '</p>');
      inputCustomValidation.resetInvalidity();
      customValidityMessage = '';

      var stopSubmit = true;
      //Запустим анимацию через 2 секунды
      setTimeout(function () {
        var messageElements = document.querySelectorAll('.page-main__error-message');
        for (var i = 0; i < messageElements.length; i++) {
          messageElements[i].classList.add('animated');
          messageElements[i].classList.add('fadeOut');
        }
      },2000);
      //Удалим через 3 секунды
      setTimeout(function () {
          var messageElement = document.querySelector('.page-main__error-message');
          var label = messageElement.parentElement;
          label.removeChild.call(label, messageElement);
        },3000);
    } // закончился if
    
  } // закончился цикл

  if (stopSubmit) {
    e.preventDefault();
  } else  {
    e.preventDefault();
    formData;
    request(formData );
  }
});






