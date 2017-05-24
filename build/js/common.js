
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
      input.insertAdjacentHTML('afterend', '<p class="page-main__error-message ' + input.name + '">' + customValidityMessageForHTML + '</p>')
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







;(function (window, document) {
  'use strict'

  var logoLink = document.getElementById('logo-footer');
  

  logoLink.addEventListener('click', function (e) {
    if (document.body.hasAttribute('data-index-page')) {
      e.preventDefault();  
    }
  });
  logoLink.addEventListener('dblclick', function (e) {
    if (document.body.hasAttribute('data-index-page')) {
      e.preventDefault();
      return false;
    }
  });
})(window, document);
;(function (window, document) {
  'use strict'

  var logoLink = document.getElementById('logo-header');
  

  logoLink.addEventListener('click', function (e) {
    if (document.body.hasAttribute('data-index-page')) {
      e.preventDefault();  
    }
  });
  logoLink.addEventListener('dblclick', function (e) {
    if (document.body.hasAttribute('data-index-page')) {
      e.preventDefault();
      return false;
    }
  });
  document.addEventListener('DOMContentLoaded', function (e) {
    logoLink.firstElementChild.classList.add('animated')
    logoLink.firstElementChild.classList.add('fadeIn');
  });
})(window, document);
;(function (window, document){
  'use strict'

  var elemHandler;
  var elemCategories = document.querySelectorAll('.categories-item');
  var elemPopular = document.querySelectorAll('.popular-item');
  var form = document.getElementById('contact-form');
  var formHeader = document.querySelector('.page-main__contact-header');
  var formText = document.querySelector('.page-main__contact-text');
//если элемент один то необходимо обязательно передать еще два элемента, или указать data-side
    elemHandler = handler.bind(this, form, 'fadeIn', 'fadeOut');
    form.style.opacity = '0';
    document.addEventListener('load', elemHandler);
    document.addEventListener('scroll', elemHandler);

    elemHandler = handler.bind(this, formHeader, 'fadeInLeft', 'fadeOutRight');
    formHeader.style.opacity = '0';
    document.addEventListener('load', elemHandler);
    document.addEventListener('scroll', elemHandler);

    elemHandler = handler.bind(this, formText, 'fadeInRight', 'fadeOutLeft');
    formText.style.opacity = '0';
    document.addEventListener('load', elemHandler);
    document.addEventListener('scroll', elemHandler);

  for (var i = 0; i < elemCategories.length; i++) {
    elemHandler = handler.bind(this, elemCategories[i]);
    elemCategories[i].style.opacity = '0';
    document.addEventListener('load', elemHandler);
    document.addEventListener('scroll', elemHandler);
  }

    for (var i = 0; i < elemPopular.length; i++) {
    elemHandler = handler.bind(this, elemPopular[i]);
    elemPopular[i].style.opacity = '0';
    document.addEventListener('load', elemHandler);
    document.addEventListener('scroll', elemHandler);
  }

  function handler(saveArg, oneClassIn, oneClassOut) {
    var saveArg = [].slice.call(arguments);
    var saveThis =this;

    function start(saveArg, oneClassIn, oneClassOut) {
      if ( inDisplay(saveArg) && isShow(saveArg) ) {

        if (saveArg.getAttribute('data-side') === 'false') {
          return;
        }
        saveArg.setAttribute('data-show','false');
        animated(saveArg, oneClassIn, oneClassOut);
        return;
      } else if ( (isShow(saveArg) == 'false') && outDisplay(saveArg)) {

         if (saveArg.getAttribute('data-side') === 'true') {
          return;
        }
        saveArg.setAttribute('data-show','true');
        animated(saveArg, oneClassIn, oneClassOut);
      } return;
    }
    //elem on screen - true, else false
    function inDisplay(elem) {
      var coords = elem.getBoundingClientRect();
      var topArea = elem.offsetHeight/5,
          bottomArea = (document.documentElement.clientHeight - elem.offsetHeight/5),
          height = document.documentElement.clientHeight;

      if (document.documentElement.clientWidth < 992) {
        return coords.top >= 0 && coords.bottom <= height;
      } else if ((coords.top > topArea || coords.bottom > topArea) && (coords.top < bottomArea )) {
        return true;
      } else if (height < elem.offsetHeight && coords.top < 0 && coords.bottom > height) {
        return true;
      } else {
        return false;
      }
    }

    function outDisplay(elem) {
      var coords = elem.getBoundingClientRect();
      var topArea = elem.offsetHeight/5,
          subTopArea = - elem.offsetHeight, 
          bottomArea = (document.documentElement.clientHeight - elem.offsetHeight/5),
          subBottomArea = document.documentElement.clientHeight + elem.offsetHeight,
          height = document.documentElement.clientHeight;

      if (document.documentElement.clientWidth < 992) {
        return (coords.top <= 0 && coords.bottom <= 0) || (coords.top >= height && coords.bottom >= height);
      }

      return (coords.bottom <= topArea || coords.top >= bottomArea);
    }

    function isShow(elem) {
      return elem.getAttribute('data-show');
    }

    function animated(elem, oneClassIn, oneClassOut) {
      var oneClassIn = oneClassIn || 'fadeIn';
      var oneClassOut = oneClassOut || 'fadeOut';

      if (elem.getAttribute('data-show') != 'true') {
        switch (elem.getAttribute('data-side')) {
          case ('left'):
            elem.classList.add('animated');
            elem.classList.add('fadeInLeftBig');
            return;
          case ('center'):
            elem.classList.add('animated');
            elem.classList.add('fadeIn');
            return;
          case ('right'):
            elem.classList.add('animated');
            elem.classList.add('fadeInRightBig');
            return;
          default:
            elem.classList.add(oneClassIn);
            elem.classList.add('animated');
        }
      } else if (elem.getAttribute('data-show') != 'false'){
        switch (elem.getAttribute('data-side')) {
          case ('left'):
            elem.classList.remove('fadeInLeftBig');
            elem.classList.add('fadeOutLeftBig');
            return;
          case ('center'):
            elem.classList.remove('fadeIn');
            elem.classList.add('fadeOut');
            return;
          case ('right'):
            elem.classList.remove('fadeInRightBig');
            elem.classList.add('fadeOutRightBig');
            return;
          default:
            elem.classList.remove(oneClassIn);
            elem.classList.add(oneClassOut);
        }
      }
    }

    return start.apply(saveThis, saveArg);
  }
})(window, document);
// EventListener | CC0 | github.com/jonathantneal/EventListener

this.Element && Element.prototype.attachEvent && !Element.prototype.addEventListener && (function () {
	function addToPrototype(name, method) {
		Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
	}

	// add
	addToPrototype("addEventListener", function (type, listener) {
		var
		target = this,
		listeners = target.addEventListener.listeners = target.addEventListener.listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		// if no events exist, attach the listener
		if (!typeListeners.length) {
			target.attachEvent("on" + type, typeListeners.event = function (event) {
				var documentElement = target.document && target.document.documentElement || target.documentElement || { scrollLeft: 0, scrollTop: 0 };

				// polyfill w3c properties and methods
				event.currentTarget = target;
				event.pageX = event.clientX + documentElement.scrollLeft;
				event.pageY = event.clientY + documentElement.scrollTop;
				event.preventDefault = function () { event.returnValue = false };
				event.relatedTarget = event.fromElement || null;
				event.stopImmediatePropagation = function () { immediatePropagation = false; event.cancelBubble = true };
				event.stopPropagation = function () { event.cancelBubble = true };
				event.target = event.srcElement || target;
				event.timeStamp = +new Date;

				var plainEvt = {};
				for (var i in event) {
					plainEvt[i] = event[i];
				}

				// create an cached list of the master events list (to protect this loop from breaking when an event is removed)
				for (var i = 0, typeListenersCache = [].concat(typeListeners), typeListenerCache, immediatePropagation = true; immediatePropagation && (typeListenerCache = typeListenersCache[i]); ++i) {
					// check to see if the cached event still exists in the master events list
					for (var ii = 0, typeListener; typeListener = typeListeners[ii]; ++ii) {
						if (typeListener == typeListenerCache) {
							typeListener.call(target, plainEvt);

							break;
						}
					}
				}
			});
		}

		// add the event to the master event list
		typeListeners.push(listener);
	});

	// remove
	addToPrototype("removeEventListener", function (type, listener) {
		var
		target = this,
		listeners = target.addEventListener.listeners = target.addEventListener.listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		// remove the newest matching event from the master event list
		for (var i = typeListeners.length - 1, typeListener; typeListener = typeListeners[i]; --i) {
			if (typeListener == listener) {
				typeListeners.splice(i, 1);

				break;
			}
		}

		// if no events exist, detach the listener
		if (!typeListeners.length && typeListeners.event) {
			target.detachEvent("on" + type, typeListeners.event);
		}
	});

	// dispatch
	addToPrototype("dispatchEvent", function (eventObject) {
		var
		target = this,
		type = eventObject.type,
		listeners = target.addEventListener.listeners = target.addEventListener.listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		try {
			return target.fireEvent("on" + type, eventObject);
		} catch (error) {
			if (typeListeners.event) {
				typeListeners.event(eventObject);
			}

			return;
		}
	});

	// CustomEvent
	Object.defineProperty(Window.prototype, "CustomEvent", {
		get: function () {
			var self = this;

			return function CustomEvent(type, eventInitDict) {
				var event = self.document.createEventObject(), key;

				event.type = type;
				for (key in eventInitDict) {
					if (key == 'cancelable'){
						event.returnValue = !eventInitDict.cancelable;
					} else if (key == 'bubbles'){
						event.cancelBubble = !eventInitDict.bubbles;
					} else if (key == 'detail'){
						event.detail = eventInitDict.detail;
					}
				}
				return event;
			};
		}
	});

	// ready
	function ready(event) {
		if (ready.interval && document.body) {
			ready.interval = clearInterval(ready.interval);

			document.dispatchEvent(new CustomEvent("DOMContentLoaded"));
		}
	}

	ready.interval = setInterval(ready, 1);

	window.addEventListener("load", ready);
})();

(!this.CustomEvent || typeof this.CustomEvent === "object") && (function() {
	// CustomEvent for browsers which don't natively support the Constructor method
	this.CustomEvent = function CustomEvent(type, eventInitDict) {
		var event;
		eventInitDict = eventInitDict || {bubbles: false, cancelable: false, detail: undefined};

		try {
			event = document.createEvent('CustomEvent');
			event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
		} catch (error) {
			// for browsers which don't support CustomEvent at all, we use a regular event instead
			event = document.createEvent('Event');
			event.initEvent(type, eventInitDict.bubbles, eventInitDict.cancelable);
			event.detail = eventInitDict.detail;
		}

		return event;
	};
})();
;(function function_name(window, document) {
  'use strict'

  var list = document.querySelector('.site-nav__list');
  var remeberElement = null;
  var subMenuStatus = false;




  list.addEventListener('mouseover', hoverSiteNavOver);
  list.addEventListener('mouseout', hoverSiteNavOut); 


  function hoverSiteNavOver(event) {
    event.preventDefault();

    var target = event.target;
    var div = document.getElementById('site-nav-toggle');
    var screenWidth = document.documentElement.clientWidth ;

//отменяет hover на медиа xs<765
    if( screenWidth < 750 ) {
      return;
    };
    //если дживение курсора на элементе
    if (remeberElement) return;

    while( target.tagName != 'UL' ) {
      if (target.hasAttribute('data-nav-li')) {
      	target.firstElementChild.classList.add('site-nav__link--active');
      	subMenuToggle(target);
      	animateAdd(target, 'fadeIn');
      	remeberElement = target;
      	break;
      }
      target = target.parentElement;
  	}
  }
  function hoverSiteNavOut(event) {
    event.preventDefault();

    var relatedTarget = event.relatedTarget;

    //если дживение курсора на элементе
    if (!remeberElement) return;

    while( relatedTarget ) {
      if (relatedTarget == remeberElement) {
      	return;
      }
      relatedTarget = relatedTarget.parentElement;
  	}
  	//произошло событие
  	remeberElement.firstElementChild.classList.remove('site-nav__link--active');
  	subMenuToggle(remeberElement);
  	animateRemove(remeberElement, 'fadeIn');
  	remeberElement = null;
  }

  function subMenuToggle(parent) {
  	var i = 0;


  	if (!subMenuStatus) {
  	  while( parent.children[i] ) {
        if (parent.children[i].tagName == 'UL') {
      	  parent.children[i].classList.add('site-nav__sub-list--active');
      	  subMenuStatus = true;
      	  break;
        }
        i++;
  	  }
  	} else {
  	  while( parent.children[i] ) {
        if (parent.children[i].tagName == 'UL') {
      	  parent.children[i].classList.remove('site-nav__sub-list--active');
      	  subMenuStatus = false;
      	  break;
        }
        i++;
  	  }	
  	}
  }
  function animateAdd(elem, animateName) {
  	elem.classList.add(animateName);
  	elem.classList.add('animated');
    
    
  }
  function animateRemove(elem, animateName) {
  	elem.classList.remove(animateName);
  }
})(window, document);



;(function (window, document) {
  'use strict'

  var div = document.getElementById('site-nav-toggle');
  var list =document.getElementById('site-nav-list');


  div.addEventListener('click', handler);

  function handler(e) {
    e.preventDefault();

//list-nav
    var removeListAnimate = removeAnimation(700);
    var removeDivAnimate = removeAnimation(700);


    this.previousElementSibling.classList.toggle('site-nav__list--hidden-sm');
    this.previousElementSibling.classList.toggle('animated');
    this.previousElementSibling.classList.toggle('fadeInRight--site-nav');
    removeListAnimate(this.previousElementSibling,'fadeInRight--site-nav');
//toggle
    this.classList.toggle('animated');
    this.classList.toggle('pulse--site-nav');
    this.classList.toggle('site-nav__toggle--active');
    removeDivAnimate(this,'pulse--site-nav');

    function removeAnimation(timer) {
      return function (arg, str) {
        var saveThis = this;
          var saveArg = arguments;
        setTimeout (function () {
          
          f.apply(saveThis, saveArg)
        }, timer);
      };
      function f(arg, str) {
       arg.classList.remove('animated');
       arg.classList.remove( str );
      }; 
    }
  }
})(window, document);
;(function (window, document) {
  'use strict'
//Events statements on contentLoaded
  var sliderHeader = document.querySelectorAll('.slider-header__header'),
      sliderText = document.querySelectorAll('.slider-header__text'),
      sliderBtnSubmit = document.querySelectorAll('.slider-header__btn'),
      sliderTabs = document.querySelectorAll('.slider-header__toggle'),
      arrContentElements = document.querySelectorAll('[id^=slider-header__content-]');


  document.addEventListener('DOMContentLoaded', function () {
    for (var i = 0; i < sliderTabs.length; i++) {
      sliderTabs[i].classList.add('animated');
      sliderTabs[i].classList.add('fadeInDownBig');
      sliderTabs[i].addEventListener('click', contentPrevNextToggle);
      sliderTabs[i].addEventListener('mouseover', function (e) {
        this.classList.remove('fadeInDownBig'); 
      });
    }
  });
  document.addEventListener('DOMContentLoaded', function () {
    for (var i = 0; i < sliderHeader.length; i++) {
      sliderHeader[i].classList.add('animated');
      sliderHeader[i].classList.add('fadeInDown'); 
    } 
  });
  document.addEventListener('DOMContentLoaded', function () {
     for (var i = 0; i < sliderText.length; i++) {
      sliderText[i].classList.add('animated');
      sliderText[i].classList.add('fadeInUp'); 
    } 
  });
  document.addEventListener('DOMContentLoaded', function () {
    for (var i = 0; i < sliderBtnSubmit.length; i++) {
      sliderBtnSubmit[i].classList.add('animated');
      sliderBtnSubmit[i].classList.add('fadeInUp'); 
    } 
  });

  function contentPrevNextToggle(event) {

    event.preventDefault();

    if (this.classList.contains('slider-header__toggle--next')) {
      for (var i = 0; i < arrContentElements.length; i++) {
        if ( !arrContentElements[i].classList.contains('slider-header__content--hidden') && (i === arrContentElements.length - 1) ) {
          arrContentElements[i].classList.add('slider-header__content--hidden');
          arrContentElements[0].classList.remove('slider-header__content--hidden');
          return
        } else if (!arrContentElements[i].classList.contains('slider-header__content--hidden')) {
          arrContentElements[i].classList.add('slider-header__content--hidden');
          arrContentElements[++i].classList.remove('slider-header__content--hidden');
          return
        }
      }
    };
    if (this.classList.contains('slider-header__toggle--prev')) {
      for (var i = arrContentElements.length - 1; i >= 0; i--) {
        if ( !arrContentElements[i].classList.contains('slider-header__content--hidden') && (i === 0) ) {
          arrContentElements[i].classList.add('slider-header__content--hidden');
          arrContentElements[arrContentElements.length - 1].classList.remove('slider-header__content--hidden');
          return;
        } else if (!(arrContentElements[i].classList.contains('slider-header__content--hidden'))) {
          arrContentElements[i].classList.add('slider-header__content--hidden');
          arrContentElements[--i].classList.remove('slider-header__content--hidden');
          return;
        }
      }
    };
  }
})(window, document);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0tdmFsaWRhdGlvbi5qcyIsImxvZ28tZm9vdGVyLmpzIiwibG9nby1oZWFkLmpzIiwibWFpbi1hbmltYXRpb24uanMiLCJwb2x5ZmlsbC1ET01Db250ZW50TG9hZGVkLmpzIiwic2lyZS1uYXYuanMiLCJzaXRlLW5hdi1kcm9wZG93bi5qcyIsInNsaWRlci1oZWFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4ndXNlIHN0cmljdCdcclxuXHJcbmZ1bmN0aW9uIHJlcXVlc3QoYXJndW1lbnQpIHtcclxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gIHhoci5vcGVuKCdHRVQnLCAnL3NlbmQnLCB0cnVlKTtcclxuXHJcbiAgeGhyLnNlbmQoYXJndW1lbnQpO1xyXG5cclxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9IDQpIHtcclxuICAgICAgcmV0dXJuOy8vINC/0L4g0L7QutC+0L3Rh9Cw0L3QuNC4INC30LDQv9GA0L7RgdCwINC00L7RgdGC0YPQv9C90Ys6XHJcbiAgICB9XHJcbiAgICAvLyBzdGF0dXMsIHN0YXR1c1RleHRcclxuICAgIC8vIHJlc3BvbnNlVGV4dCwgcmVzcG9uc2VYTUwgKNC/0YDQuCBjb250ZW50LXR5cGU6IHRleHQveG1sKVxyXG4gICAgaWYgKHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAvLyDQvtCx0YDQsNCx0L7RgtCw0YLRjCDQvtGI0LjQsdC60YNcclxuICAgICAgYWxlcnQoICfQvtGI0LjQsdC60LA6ICcgKyAodGhpcy5zdGF0dXMgPyB0aGlzLnN0YXR1c1RleHQgOiAn0LfQsNC/0YDQvtGBINC90LUg0YPQtNCw0LvRgdGPJykgKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gQ3VzdG9tVmFsaWRhdGlvbigpIHsgfVxyXG5cclxuQ3VzdG9tVmFsaWRhdGlvbi5wcm90b3R5cGUgPSB7XHJcbiAgLy8g0KPRgdGC0LDQvdC+0LLQuNC8INC/0YPRgdGC0L7QuSDQvNCw0YHRgdC40LIg0YHQvtC+0LHRidC10L3QuNC5INC+0LEg0L7RiNC40LHQutCw0YVcclxuICBpbnZhbGlkaXRpZXM6IFtdLFxyXG5cclxuICAvLyDQnNC10YLQvtC0LCDQv9GA0L7QstC10YDRj9GO0YnQuNC5INCy0LDQu9C40LTQvdC+0YHRgtGMXHJcbiAgY2hlY2tWYWxpZGl0eTogZnVuY3Rpb24oaW5wdXQpIHtcclxuXHJcbiAgICB2YXIgdmFsaWRpdHkgPSBpbnB1dC52YWxpZGl0eTtcclxuXHJcbiAgICBpZiAodmFsaWRpdHkucGF0dGVybk1pc21hdGNoKSB7XHJcbiAgICAgIHRoaXMuYWRkSW52YWxpZGl0eSgnVGhpcyBpcyB0aGUgd3JvbmcgcGF0dGVybiBmb3IgdGhpcyBmaWVsZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWxpZGl0eS5yYW5nZU92ZXJmbG93KSB7XHJcbiAgICAgIHZhciBtYXggPSBnZXRBdHRyaWJ1dGVWYWx1ZShpbnB1dCwgJ21heCcpO1xyXG4gICAgICB0aGlzLmFkZEludmFsaWRpdHkoJ1RoZSBtYXhpbXVtIHZhbHVlIHNob3VsZCBiZSAnICsgbWF4KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cpIHtcclxuICAgICAgdmFyIG1pbiA9IGdldEF0dHJpYnV0ZVZhbHVlKGlucHV0LCAnbWluJyk7XHJcbiAgICAgIHRoaXMuYWRkSW52YWxpZGl0eSgnVGhlIG1pbmltdW0gdmFsdWUgc2hvdWxkIGJlICcgKyBtaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWxpZGl0eS5zdGVwTWlzbWF0Y2gpIHtcclxuICAgICAgdmFyIHN0ZXAgPSBnZXRBdHRyaWJ1dGVWYWx1ZShpbnB1dCwgJ3N0ZXAnKTtcclxuICAgICAgdGhpcy5hZGRJbnZhbGlkaXR5KCdUaGlzIG51bWJlciBuZWVkcyB0byBiZSBhIG11bHRpcGxlIG9mICcgKyBzdGVwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQmCDQvtGB0YLQsNC70YzQvdGL0LUg0L/RgNC+0LLQtdGA0LrQuCDQstCw0LvQuNC00L3QvtGB0YLQuC4uLlxyXG4gIH0sXHJcblxyXG4gIC8vINCU0L7QsdCw0LLQu9GP0LXQvCDRgdC+0L7QsdGJ0LXQvdC40LUg0L7QsSDQvtGI0LjQsdC60LUg0LIg0LzQsNGB0YHQuNCyINC+0YjQuNCx0L7QulxyXG4gIGFkZEludmFsaWRpdHk6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgIHRoaXMuaW52YWxpZGl0aWVzLnB1c2gobWVzc2FnZSk7XHJcbiAgfSxcclxuXHJcbiAgLy8g0J/QvtC70YPRh9Cw0LXQvCDQvtCx0YnQuNC5INGC0LXQutGB0YIg0YHQvtC+0LHRidC10L3QuNC5INC+0LEg0L7RiNC40LHQutCw0YVcclxuICBnZXRJbnZhbGlkaXRpZXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZGl0aWVzLmpvaW4oJy4gXFxuJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuQ3VzdG9tVmFsaWRhdGlvbi5wcm90b3R5cGUuZ2V0SW52YWxpZGl0aWVzRm9ySFRNTCA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB0aGlzLmludmFsaWRpdGllcy5qb2luKCcuIDxicj4nKTtcclxufVxyXG5cclxudmFyIHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWZvcm0tc3VibWl0Jyk7XHJcblxyXG4vLyDQlNC+0LHQsNCy0LvRj9C10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9C40LrQsCDQvdCwINC60L3QvtC/0LrRgyDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80Ytcclxuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gIHZhciBmb3JtRGF0YSAgPSBuZXcgRm9ybURhdGEodGhpcy5mb3JtKTtcclxuICB2YXIgaW5wdXRzID0gW107XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJlbnRFbGVtZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpbnB1dHMucHVzaCh0aGlzLnBhcmVudEVsZW1lbnRbaV0pO1xyXG5cclxuICB9XHJcbiAgLy8g0J/RgNC+0LnQtNGR0LzRgdGPINC/0L4g0LLRgdC10Lwg0L/QvtC70Y/QvFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgdmFyIGlucHV0ID0gaW5wdXRzW2ldO1xyXG4gICAgLy8g0J/RgNC+0LLQtdGA0LjQvCDQstCw0LvQuNC00L3QvtGB0YLRjCDQv9C+0LvRjywg0LjRgdC/0L7Qu9GM0LfRg9GPINCy0YHRgtGA0L7QtdC90L3Rg9GOINCyIEphdmFTY3JpcHQg0YTRg9C90LrRhtC40Y4gY2hlY2tWYWxpZGl0eSgpXHJcbiAgICBpZiAoaW5wdXQuY2hlY2tWYWxpZGl0eSgpID09IGZhbHNlKSB7XHJcblxyXG4gICAgICB2YXIgaW5wdXRDdXN0b21WYWxpZGF0aW9uID0gbmV3IEN1c3RvbVZhbGlkYXRpb24oKTsgLy8g0KHQvtC30LTQsNC00LjQvCDQvtCx0YrQtdC60YIgQ3VzdG9tVmFsaWRhdGlvblxyXG4gICAgICBpbnB1dEN1c3RvbVZhbGlkYXRpb24uY2hlY2tWYWxpZGl0eShpbnB1dCk7IC8vINCS0YvRj9Cy0LjQvCDQvtGI0LjQsdC60LhcclxuICAgICAgdmFyIGN1c3RvbVZhbGlkaXR5TWVzc2FnZSA9IGlucHV0Q3VzdG9tVmFsaWRhdGlvbi5nZXRJbnZhbGlkaXRpZXMoKTsgLy8g0J/QvtC70YPRh9C40Lwg0LLRgdC1INGB0L7QvtCx0YnQtdC90LjRjyDQvtCxINC+0YjQuNCx0LrQsNGFXHJcbiAgICAgIGlucHV0LnNldEN1c3RvbVZhbGlkaXR5KGN1c3RvbVZhbGlkaXR5TWVzc2FnZSk7IC8vINCj0YHRgtCw0L3QvtCy0LjQvCDRgdC/0LXRhtC40LDQu9GM0L3QvtC1INGB0L7QvtCx0YnQtdC90LjQtSDQvtCxINC+0YjQuNCx0LrQtVxyXG5cclxuICAgICAgLy8g0JTQvtCx0LDQstC40Lwg0L7RiNC40LHQutC4INCyINC00L7QutGD0LzQtdC90YJcclxuICAgICAgdmFyIGN1c3RvbVZhbGlkaXR5TWVzc2FnZUZvckhUTUwgPSBpbnB1dEN1c3RvbVZhbGlkYXRpb24uZ2V0SW52YWxpZGl0aWVzRm9ySFRNTCgpO1xyXG4gICAgICAvLyDQldGB0LvQuCDQv9C+0LvQtSDQv9GD0YHRgtC+0LVcclxuICAgICAgaWYgKCFjdXN0b21WYWxpZGl0eU1lc3NhZ2VGb3JIVE1MKSB7XHJcbiAgICAgICAgY3VzdG9tVmFsaWRpdHlNZXNzYWdlRm9ySFRNTCA9J1JlcXVpcmVkIGZpZWxkJztcclxuICAgICAgfVxyXG4gICAgICBpbnB1dC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgJzxwIGNsYXNzPVwicGFnZS1tYWluX19lcnJvci1tZXNzYWdlICcgKyBpbnB1dC5uYW1lICsgJ1wiPicgKyBjdXN0b21WYWxpZGl0eU1lc3NhZ2VGb3JIVE1MICsgJzwvcD4nKVxyXG4gICAgICB2YXIgc3RvcFN1Ym1pdCA9IHRydWU7XHJcbiAgICAgIC8v0JfQsNC/0YPRgdGC0LjQvCDQsNC90LjQvNCw0YbQuNGOINGH0LXRgNC10LcgMiDRgdC10LrRg9C90LTRi1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2UtbWFpbl9fZXJyb3ItbWVzc2FnZScpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBtZXNzYWdlRWxlbWVudHNbaV0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnKTtcclxuICAgICAgICAgIG1lc3NhZ2VFbGVtZW50c1tpXS5jbGFzc0xpc3QuYWRkKCdmYWRlT3V0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LDIwMDApO1xyXG4gICAgICAvL9Cj0LTQsNC70LjQvCDRh9C10YDQtdC3IDMg0YHQtdC60YPQvdC00YtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1tYWluX19lcnJvci1tZXNzYWdlJyk7XHJcbiAgICAgICAgICB2YXIgbGFiZWwgPSBtZXNzYWdlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgbGFiZWwucmVtb3ZlQ2hpbGQuY2FsbChsYWJlbCwgbWVzc2FnZUVsZW1lbnQpO1xyXG4gICAgICAgIH0sMzAwMCk7XHJcbiAgICB9IC8vINC30LDQutC+0L3Rh9C40LvRgdGPIGlmXHJcbiAgICBcclxuICB9IC8vINC30LDQutC+0L3Rh9C40LvRgdGPINGG0LjQutC7XHJcblxyXG4gIGlmIChzdG9wU3VibWl0KSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSBlbHNlICB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBmb3JtRGF0YTtcclxuICAgIHJlcXVlc3QoZm9ybURhdGEgKTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCI7KGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KSB7XHJcbiAgJ3VzZSBzdHJpY3QnXHJcblxyXG4gIHZhciBsb2dvTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvLWZvb3RlcicpO1xyXG4gIFxyXG5cclxuICBsb2dvTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuYm9keS5oYXNBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgtcGFnZScpKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTsgIFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGxvZ29MaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChkb2N1bWVudC5ib2R5Lmhhc0F0dHJpYnV0ZSgnZGF0YS1pbmRleC1wYWdlJykpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIjsoZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQpIHtcclxuICAndXNlIHN0cmljdCdcclxuXHJcbiAgdmFyIGxvZ29MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ28taGVhZGVyJyk7XHJcbiAgXHJcblxyXG4gIGxvZ29MaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChkb2N1bWVudC5ib2R5Lmhhc0F0dHJpYnV0ZSgnZGF0YS1pbmRleC1wYWdlJykpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbG9nb0xpbmsuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGRvY3VtZW50LmJvZHkuaGFzQXR0cmlidXRlKCdkYXRhLWluZGV4LXBhZ2UnKSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9KTtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGxvZ29MaW5rLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGVkJylcclxuICAgIGxvZ29MaW5rLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZhZGVJbicpO1xyXG4gIH0pO1xyXG59KSh3aW5kb3csIGRvY3VtZW50KTsiLCI7KGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KXtcclxuICAndXNlIHN0cmljdCdcclxuXHJcbiAgdmFyIGVsZW1IYW5kbGVyO1xyXG4gIHZhciBlbGVtQ2F0ZWdvcmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yaWVzLWl0ZW0nKTtcclxuICB2YXIgZWxlbVBvcHVsYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdWxhci1pdGVtJyk7XHJcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1mb3JtJyk7XHJcbiAgdmFyIGZvcm1IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1tYWluX19jb250YWN0LWhlYWRlcicpO1xyXG4gIHZhciBmb3JtVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLW1haW5fX2NvbnRhY3QtdGV4dCcpO1xyXG4vL9C10YHQu9C4INGN0LvQtdC80LXQvdGCINC+0LTQuNC9INGC0L4g0L3QtdC+0LHRhdC+0LTQuNC80L4g0L7QsdGP0LfQsNGC0LXQu9GM0L3QviDQv9C10YDQtdC00LDRgtGMINC10YnQtSDQtNCy0LAg0Y3Qu9C10LzQtdC90YLQsCwg0LjQu9C4INGD0LrQsNC30LDRgtGMIGRhdGEtc2lkZVxyXG4gICAgZWxlbUhhbmRsZXIgPSBoYW5kbGVyLmJpbmQodGhpcywgZm9ybSwgJ2ZhZGVJbicsICdmYWRlT3V0Jyk7XHJcbiAgICBmb3JtLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZWxlbUhhbmRsZXIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZWxlbUhhbmRsZXIpO1xyXG5cclxuICAgIGVsZW1IYW5kbGVyID0gaGFuZGxlci5iaW5kKHRoaXMsIGZvcm1IZWFkZXIsICdmYWRlSW5MZWZ0JywgJ2ZhZGVPdXRSaWdodCcpO1xyXG4gICAgZm9ybUhlYWRlci5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGVsZW1IYW5kbGVyKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGVsZW1IYW5kbGVyKTtcclxuXHJcbiAgICBlbGVtSGFuZGxlciA9IGhhbmRsZXIuYmluZCh0aGlzLCBmb3JtVGV4dCwgJ2ZhZGVJblJpZ2h0JywgJ2ZhZGVPdXRMZWZ0Jyk7XHJcbiAgICBmb3JtVGV4dC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGVsZW1IYW5kbGVyKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGVsZW1IYW5kbGVyKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtQ2F0ZWdvcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZWxlbUhhbmRsZXIgPSBoYW5kbGVyLmJpbmQodGhpcywgZWxlbUNhdGVnb3JpZXNbaV0pO1xyXG4gICAgZWxlbUNhdGVnb3JpZXNbaV0uc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlbGVtSGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBlbGVtSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbVBvcHVsYXIubGVuZ3RoOyBpKyspIHtcclxuICAgIGVsZW1IYW5kbGVyID0gaGFuZGxlci5iaW5kKHRoaXMsIGVsZW1Qb3B1bGFyW2ldKTtcclxuICAgIGVsZW1Qb3B1bGFyW2ldLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZWxlbUhhbmRsZXIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZWxlbUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlcihzYXZlQXJnLCBvbmVDbGFzc0luLCBvbmVDbGFzc091dCkge1xyXG4gICAgdmFyIHNhdmVBcmcgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICB2YXIgc2F2ZVRoaXMgPXRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gc3RhcnQoc2F2ZUFyZywgb25lQ2xhc3NJbiwgb25lQ2xhc3NPdXQpIHtcclxuICAgICAgaWYgKCBpbkRpc3BsYXkoc2F2ZUFyZykgJiYgaXNTaG93KHNhdmVBcmcpICkge1xyXG5cclxuICAgICAgICBpZiAoc2F2ZUFyZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2lkZScpID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNhdmVBcmcuc2V0QXR0cmlidXRlKCdkYXRhLXNob3cnLCdmYWxzZScpO1xyXG4gICAgICAgIGFuaW1hdGVkKHNhdmVBcmcsIG9uZUNsYXNzSW4sIG9uZUNsYXNzT3V0KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSBpZiAoIChpc1Nob3coc2F2ZUFyZykgPT0gJ2ZhbHNlJykgJiYgb3V0RGlzcGxheShzYXZlQXJnKSkge1xyXG5cclxuICAgICAgICAgaWYgKHNhdmVBcmcuZ2V0QXR0cmlidXRlKCdkYXRhLXNpZGUnKSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNhdmVBcmcuc2V0QXR0cmlidXRlKCdkYXRhLXNob3cnLCd0cnVlJyk7XHJcbiAgICAgICAgYW5pbWF0ZWQoc2F2ZUFyZywgb25lQ2xhc3NJbiwgb25lQ2xhc3NPdXQpO1xyXG4gICAgICB9IHJldHVybjtcclxuICAgIH1cclxuICAgIC8vZWxlbSBvbiBzY3JlZW4gLSB0cnVlLCBlbHNlIGZhbHNlXHJcbiAgICBmdW5jdGlvbiBpbkRpc3BsYXkoZWxlbSkge1xyXG4gICAgICB2YXIgY29vcmRzID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgdmFyIHRvcEFyZWEgPSBlbGVtLm9mZnNldEhlaWdodC81LFxyXG4gICAgICAgICAgYm90dG9tQXJlYSA9IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gZWxlbS5vZmZzZXRIZWlnaHQvNSksXHJcbiAgICAgICAgICBoZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cclxuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA8IDk5Mikge1xyXG4gICAgICAgIHJldHVybiBjb29yZHMudG9wID49IDAgJiYgY29vcmRzLmJvdHRvbSA8PSBoZWlnaHQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoKGNvb3Jkcy50b3AgPiB0b3BBcmVhIHx8IGNvb3Jkcy5ib3R0b20gPiB0b3BBcmVhKSAmJiAoY29vcmRzLnRvcCA8IGJvdHRvbUFyZWEgKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKGhlaWdodCA8IGVsZW0ub2Zmc2V0SGVpZ2h0ICYmIGNvb3Jkcy50b3AgPCAwICYmIGNvb3Jkcy5ib3R0b20gPiBoZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvdXREaXNwbGF5KGVsZW0pIHtcclxuICAgICAgdmFyIGNvb3JkcyA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHZhciB0b3BBcmVhID0gZWxlbS5vZmZzZXRIZWlnaHQvNSxcclxuICAgICAgICAgIHN1YlRvcEFyZWEgPSAtIGVsZW0ub2Zmc2V0SGVpZ2h0LCBcclxuICAgICAgICAgIGJvdHRvbUFyZWEgPSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIGVsZW0ub2Zmc2V0SGVpZ2h0LzUpLFxyXG4gICAgICAgICAgc3ViQm90dG9tQXJlYSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyBlbGVtLm9mZnNldEhlaWdodCxcclxuICAgICAgICAgIGhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDwgOTkyKSB7XHJcbiAgICAgICAgcmV0dXJuIChjb29yZHMudG9wIDw9IDAgJiYgY29vcmRzLmJvdHRvbSA8PSAwKSB8fCAoY29vcmRzLnRvcCA+PSBoZWlnaHQgJiYgY29vcmRzLmJvdHRvbSA+PSBoZWlnaHQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gKGNvb3Jkcy5ib3R0b20gPD0gdG9wQXJlYSB8fCBjb29yZHMudG9wID49IGJvdHRvbUFyZWEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzU2hvdyhlbGVtKSB7XHJcbiAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1zaG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZWQoZWxlbSwgb25lQ2xhc3NJbiwgb25lQ2xhc3NPdXQpIHtcclxuICAgICAgdmFyIG9uZUNsYXNzSW4gPSBvbmVDbGFzc0luIHx8ICdmYWRlSW4nO1xyXG4gICAgICB2YXIgb25lQ2xhc3NPdXQgPSBvbmVDbGFzc091dCB8fCAnZmFkZU91dCc7XHJcblxyXG4gICAgICBpZiAoZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hvdycpICE9ICd0cnVlJykge1xyXG4gICAgICAgIHN3aXRjaCAoZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2lkZScpKSB7XHJcbiAgICAgICAgICBjYXNlICgnbGVmdCcpOlxyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGVkJyk7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnZmFkZUluTGVmdEJpZycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICBjYXNlICgnY2VudGVyJyk6XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdmYWRlSW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgY2FzZSAoJ3JpZ2h0Jyk6XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdmYWRlSW5SaWdodEJpZycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQob25lQ2xhc3NJbik7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hvdycpICE9ICdmYWxzZScpe1xyXG4gICAgICAgIHN3aXRjaCAoZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2lkZScpKSB7XHJcbiAgICAgICAgICBjYXNlICgnbGVmdCcpOlxyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGVJbkxlZnRCaWcnKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdmYWRlT3V0TGVmdEJpZycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICBjYXNlICgnY2VudGVyJyk6XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZmFkZUluJyk7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnZmFkZU91dCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICBjYXNlICgncmlnaHQnKTpcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlSW5SaWdodEJpZycpO1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ZhZGVPdXRSaWdodEJpZycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUob25lQ2xhc3NJbik7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChvbmVDbGFzc091dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0YXJ0LmFwcGx5KHNhdmVUaGlzLCBzYXZlQXJnKTtcclxuICB9XHJcbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIi8vIEV2ZW50TGlzdGVuZXIgfCBDQzAgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvRXZlbnRMaXN0ZW5lclxyXG5cclxudGhpcy5FbGVtZW50ICYmIEVsZW1lbnQucHJvdG90eXBlLmF0dGFjaEV2ZW50ICYmICFFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyICYmIChmdW5jdGlvbiAoKSB7XHJcblx0ZnVuY3Rpb24gYWRkVG9Qcm90b3R5cGUobmFtZSwgbWV0aG9kKSB7XHJcblx0XHRXaW5kb3cucHJvdG90eXBlW25hbWVdID0gSFRNTERvY3VtZW50LnByb3RvdHlwZVtuYW1lXSA9IEVsZW1lbnQucHJvdG90eXBlW25hbWVdID0gbWV0aG9kO1xyXG5cdH1cclxuXHJcblx0Ly8gYWRkXHJcblx0YWRkVG9Qcm90b3R5cGUoXCJhZGRFdmVudExpc3RlbmVyXCIsIGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xyXG5cdFx0dmFyXHJcblx0XHR0YXJnZXQgPSB0aGlzLFxyXG5cdFx0bGlzdGVuZXJzID0gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIubGlzdGVuZXJzID0gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIubGlzdGVuZXJzIHx8IHt9LFxyXG5cdFx0dHlwZUxpc3RlbmVycyA9IGxpc3RlbmVyc1t0eXBlXSA9IGxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcclxuXHJcblx0XHQvLyBpZiBubyBldmVudHMgZXhpc3QsIGF0dGFjaCB0aGUgbGlzdGVuZXJcclxuXHRcdGlmICghdHlwZUxpc3RlbmVycy5sZW5ndGgpIHtcclxuXHRcdFx0dGFyZ2V0LmF0dGFjaEV2ZW50KFwib25cIiArIHR5cGUsIHR5cGVMaXN0ZW5lcnMuZXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHR2YXIgZG9jdW1lbnRFbGVtZW50ID0gdGFyZ2V0LmRvY3VtZW50ICYmIHRhcmdldC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgdGFyZ2V0LmRvY3VtZW50RWxlbWVudCB8fCB7IHNjcm9sbExlZnQ6IDAsIHNjcm9sbFRvcDogMCB9O1xyXG5cclxuXHRcdFx0XHQvLyBwb2x5ZmlsbCB3M2MgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xyXG5cdFx0XHRcdGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdFx0ZXZlbnQucGFnZVggPSBldmVudC5jbGllbnRYICsgZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblx0XHRcdFx0ZXZlbnQucGFnZVkgPSBldmVudC5jbGllbnRZICsgZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHsgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZSB9O1xyXG5cdFx0XHRcdGV2ZW50LnJlbGF0ZWRUYXJnZXQgPSBldmVudC5mcm9tRWxlbWVudCB8fCBudWxsO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHsgaW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmYWxzZTsgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZSB9O1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHsgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZSB9O1xyXG5cdFx0XHRcdGV2ZW50LnRhcmdldCA9IGV2ZW50LnNyY0VsZW1lbnQgfHwgdGFyZ2V0O1xyXG5cdFx0XHRcdGV2ZW50LnRpbWVTdGFtcCA9ICtuZXcgRGF0ZTtcclxuXHJcblx0XHRcdFx0dmFyIHBsYWluRXZ0ID0ge307XHJcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBldmVudCkge1xyXG5cdFx0XHRcdFx0cGxhaW5FdnRbaV0gPSBldmVudFtpXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNyZWF0ZSBhbiBjYWNoZWQgbGlzdCBvZiB0aGUgbWFzdGVyIGV2ZW50cyBsaXN0ICh0byBwcm90ZWN0IHRoaXMgbG9vcCBmcm9tIGJyZWFraW5nIHdoZW4gYW4gZXZlbnQgaXMgcmVtb3ZlZClcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgdHlwZUxpc3RlbmVyc0NhY2hlID0gW10uY29uY2F0KHR5cGVMaXN0ZW5lcnMpLCB0eXBlTGlzdGVuZXJDYWNoZSwgaW1tZWRpYXRlUHJvcGFnYXRpb24gPSB0cnVlOyBpbW1lZGlhdGVQcm9wYWdhdGlvbiAmJiAodHlwZUxpc3RlbmVyQ2FjaGUgPSB0eXBlTGlzdGVuZXJzQ2FjaGVbaV0pOyArK2kpIHtcclxuXHRcdFx0XHRcdC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgY2FjaGVkIGV2ZW50IHN0aWxsIGV4aXN0cyBpbiB0aGUgbWFzdGVyIGV2ZW50cyBsaXN0XHJcblx0XHRcdFx0XHRmb3IgKHZhciBpaSA9IDAsIHR5cGVMaXN0ZW5lcjsgdHlwZUxpc3RlbmVyID0gdHlwZUxpc3RlbmVyc1tpaV07ICsraWkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHR5cGVMaXN0ZW5lciA9PSB0eXBlTGlzdGVuZXJDYWNoZSkge1xyXG5cdFx0XHRcdFx0XHRcdHR5cGVMaXN0ZW5lci5jYWxsKHRhcmdldCwgcGxhaW5FdnQpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWRkIHRoZSBldmVudCB0byB0aGUgbWFzdGVyIGV2ZW50IGxpc3RcclxuXHRcdHR5cGVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblx0fSk7XHJcblxyXG5cdC8vIHJlbW92ZVxyXG5cdGFkZFRvUHJvdG90eXBlKFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiLCBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcclxuXHRcdHZhclxyXG5cdFx0dGFyZ2V0ID0gdGhpcyxcclxuXHRcdGxpc3RlbmVycyA9IHRhcmdldC5hZGRFdmVudExpc3RlbmVyLmxpc3RlbmVycyA9IHRhcmdldC5hZGRFdmVudExpc3RlbmVyLmxpc3RlbmVycyB8fCB7fSxcclxuXHRcdHR5cGVMaXN0ZW5lcnMgPSBsaXN0ZW5lcnNbdHlwZV0gPSBsaXN0ZW5lcnNbdHlwZV0gfHwgW107XHJcblxyXG5cdFx0Ly8gcmVtb3ZlIHRoZSBuZXdlc3QgbWF0Y2hpbmcgZXZlbnQgZnJvbSB0aGUgbWFzdGVyIGV2ZW50IGxpc3RcclxuXHRcdGZvciAodmFyIGkgPSB0eXBlTGlzdGVuZXJzLmxlbmd0aCAtIDEsIHR5cGVMaXN0ZW5lcjsgdHlwZUxpc3RlbmVyID0gdHlwZUxpc3RlbmVyc1tpXTsgLS1pKSB7XHJcblx0XHRcdGlmICh0eXBlTGlzdGVuZXIgPT0gbGlzdGVuZXIpIHtcclxuXHRcdFx0XHR0eXBlTGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiBubyBldmVudHMgZXhpc3QsIGRldGFjaCB0aGUgbGlzdGVuZXJcclxuXHRcdGlmICghdHlwZUxpc3RlbmVycy5sZW5ndGggJiYgdHlwZUxpc3RlbmVycy5ldmVudCkge1xyXG5cdFx0XHR0YXJnZXQuZGV0YWNoRXZlbnQoXCJvblwiICsgdHlwZSwgdHlwZUxpc3RlbmVycy5ldmVudCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIGRpc3BhdGNoXHJcblx0YWRkVG9Qcm90b3R5cGUoXCJkaXNwYXRjaEV2ZW50XCIsIGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xyXG5cdFx0dmFyXHJcblx0XHR0YXJnZXQgPSB0aGlzLFxyXG5cdFx0dHlwZSA9IGV2ZW50T2JqZWN0LnR5cGUsXHJcblx0XHRsaXN0ZW5lcnMgPSB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lci5saXN0ZW5lcnMgPSB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lci5saXN0ZW5lcnMgfHwge30sXHJcblx0XHR0eXBlTGlzdGVuZXJzID0gbGlzdGVuZXJzW3R5cGVdID0gbGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdHJldHVybiB0YXJnZXQuZmlyZUV2ZW50KFwib25cIiArIHR5cGUsIGV2ZW50T2JqZWN0KTtcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdGlmICh0eXBlTGlzdGVuZXJzLmV2ZW50KSB7XHJcblx0XHRcdFx0dHlwZUxpc3RlbmVycy5ldmVudChldmVudE9iamVjdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gQ3VzdG9tRXZlbnRcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoV2luZG93LnByb3RvdHlwZSwgXCJDdXN0b21FdmVudFwiLCB7XHJcblx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KHR5cGUsIGV2ZW50SW5pdERpY3QpIHtcclxuXHRcdFx0XHR2YXIgZXZlbnQgPSBzZWxmLmRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCksIGtleTtcclxuXHJcblx0XHRcdFx0ZXZlbnQudHlwZSA9IHR5cGU7XHJcblx0XHRcdFx0Zm9yIChrZXkgaW4gZXZlbnRJbml0RGljdCkge1xyXG5cdFx0XHRcdFx0aWYgKGtleSA9PSAnY2FuY2VsYWJsZScpe1xyXG5cdFx0XHRcdFx0XHRldmVudC5yZXR1cm5WYWx1ZSA9ICFldmVudEluaXREaWN0LmNhbmNlbGFibGU7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGtleSA9PSAnYnViYmxlcycpe1xyXG5cdFx0XHRcdFx0XHRldmVudC5jYW5jZWxCdWJibGUgPSAhZXZlbnRJbml0RGljdC5idWJibGVzO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChrZXkgPT0gJ2RldGFpbCcpe1xyXG5cdFx0XHRcdFx0XHRldmVudC5kZXRhaWwgPSBldmVudEluaXREaWN0LmRldGFpbDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50O1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyByZWFkeVxyXG5cdGZ1bmN0aW9uIHJlYWR5KGV2ZW50KSB7XHJcblx0XHRpZiAocmVhZHkuaW50ZXJ2YWwgJiYgZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRyZWFkeS5pbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwocmVhZHkuaW50ZXJ2YWwpO1xyXG5cclxuXHRcdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJET01Db250ZW50TG9hZGVkXCIpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlYWR5LmludGVydmFsID0gc2V0SW50ZXJ2YWwocmVhZHksIDEpO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVhZHkpO1xyXG59KSgpO1xyXG5cclxuKCF0aGlzLkN1c3RvbUV2ZW50IHx8IHR5cGVvZiB0aGlzLkN1c3RvbUV2ZW50ID09PSBcIm9iamVjdFwiKSAmJiAoZnVuY3Rpb24oKSB7XHJcblx0Ly8gQ3VzdG9tRXZlbnQgZm9yIGJyb3dzZXJzIHdoaWNoIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgdGhlIENvbnN0cnVjdG9yIG1ldGhvZFxyXG5cdHRoaXMuQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbiBDdXN0b21FdmVudCh0eXBlLCBldmVudEluaXREaWN0KSB7XHJcblx0XHR2YXIgZXZlbnQ7XHJcblx0XHRldmVudEluaXREaWN0ID0gZXZlbnRJbml0RGljdCB8fCB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZH07XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuXHRcdFx0ZXZlbnQuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGV2ZW50SW5pdERpY3QuYnViYmxlcywgZXZlbnRJbml0RGljdC5jYW5jZWxhYmxlLCBldmVudEluaXREaWN0LmRldGFpbCk7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHQvLyBmb3IgYnJvd3NlcnMgd2hpY2ggZG9uJ3Qgc3VwcG9ydCBDdXN0b21FdmVudCBhdCBhbGwsIHdlIHVzZSBhIHJlZ3VsYXIgZXZlbnQgaW5zdGVhZFxyXG5cdFx0XHRldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xyXG5cdFx0XHRldmVudC5pbml0RXZlbnQodHlwZSwgZXZlbnRJbml0RGljdC5idWJibGVzLCBldmVudEluaXREaWN0LmNhbmNlbGFibGUpO1xyXG5cdFx0XHRldmVudC5kZXRhaWwgPSBldmVudEluaXREaWN0LmRldGFpbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZXZlbnQ7XHJcblx0fTtcclxufSkoKTsiLCI7KGZ1bmN0aW9uIGZ1bmN0aW9uX25hbWUod2luZG93LCBkb2N1bWVudCkge1xyXG4gICd1c2Ugc3RyaWN0J1xyXG5cclxuICB2YXIgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLW5hdl9fbGlzdCcpO1xyXG4gIHZhciByZW1lYmVyRWxlbWVudCA9IG51bGw7XHJcbiAgdmFyIHN1Yk1lbnVTdGF0dXMgPSBmYWxzZTtcclxuXHJcblxyXG5cclxuXHJcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBob3ZlclNpdGVOYXZPdmVyKTtcclxuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaG92ZXJTaXRlTmF2T3V0KTsgXHJcblxyXG5cclxuICBmdW5jdGlvbiBob3ZlclNpdGVOYXZPdmVyKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpdGUtbmF2LXRvZ2dsZScpO1xyXG4gICAgdmFyIHNjcmVlbldpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDtcclxuXHJcbi8v0L7RgtC80LXQvdGP0LXRgiBob3ZlciDQvdCwINC80LXQtNC40LAgeHM8NzY1XHJcbiAgICBpZiggc2NyZWVuV2lkdGggPCA3NTAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvL9C10YHQu9C4INC00LbQuNCy0LXQvdC40LUg0LrRg9GA0YHQvtGA0LAg0L3QsCDRjdC70LXQvNC10L3RgtC1XHJcbiAgICBpZiAocmVtZWJlckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICB3aGlsZSggdGFyZ2V0LnRhZ05hbWUgIT0gJ1VMJyApIHtcclxuICAgICAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmF2LWxpJykpIHtcclxuICAgICAgXHR0YXJnZXQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZCgnc2l0ZS1uYXZfX2xpbmstLWFjdGl2ZScpO1xyXG4gICAgICBcdHN1Yk1lbnVUb2dnbGUodGFyZ2V0KTtcclxuICAgICAgXHRhbmltYXRlQWRkKHRhcmdldCwgJ2ZhZGVJbicpO1xyXG4gICAgICBcdHJlbWViZXJFbGVtZW50ID0gdGFyZ2V0O1xyXG4gICAgICBcdGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4gIFx0fVxyXG4gIH1cclxuICBmdW5jdGlvbiBob3ZlclNpdGVOYXZPdXQoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xyXG5cclxuICAgIC8v0LXRgdC70Lgg0LTQttC40LLQtdC90LjQtSDQutGD0YDRgdC+0YDQsCDQvdCwINGN0LvQtdC80LXQvdGC0LVcclxuICAgIGlmICghcmVtZWJlckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICB3aGlsZSggcmVsYXRlZFRhcmdldCApIHtcclxuICAgICAgaWYgKHJlbGF0ZWRUYXJnZXQgPT0gcmVtZWJlckVsZW1lbnQpIHtcclxuICAgICAgXHRyZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgcmVsYXRlZFRhcmdldCA9IHJlbGF0ZWRUYXJnZXQucGFyZW50RWxlbWVudDtcclxuICBcdH1cclxuICBcdC8v0L/RgNC+0LjQt9C+0YjQu9C+INGB0L7QsdGL0YLQuNC1XHJcbiAgXHRyZW1lYmVyRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdzaXRlLW5hdl9fbGluay0tYWN0aXZlJyk7XHJcbiAgXHRzdWJNZW51VG9nZ2xlKHJlbWViZXJFbGVtZW50KTtcclxuICBcdGFuaW1hdGVSZW1vdmUocmVtZWJlckVsZW1lbnQsICdmYWRlSW4nKTtcclxuICBcdHJlbWViZXJFbGVtZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN1Yk1lbnVUb2dnbGUocGFyZW50KSB7XHJcbiAgXHR2YXIgaSA9IDA7XHJcblxyXG5cclxuICBcdGlmICghc3ViTWVudVN0YXR1cykge1xyXG4gIFx0ICB3aGlsZSggcGFyZW50LmNoaWxkcmVuW2ldICkge1xyXG4gICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW5baV0udGFnTmFtZSA9PSAnVUwnKSB7XHJcbiAgICAgIFx0ICBwYXJlbnQuY2hpbGRyZW5baV0uY2xhc3NMaXN0LmFkZCgnc2l0ZS1uYXZfX3N1Yi1saXN0LS1hY3RpdmUnKTtcclxuICAgICAgXHQgIHN1Yk1lbnVTdGF0dXMgPSB0cnVlO1xyXG4gICAgICBcdCAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkrKztcclxuICBcdCAgfVxyXG4gIFx0fSBlbHNlIHtcclxuICBcdCAgd2hpbGUoIHBhcmVudC5jaGlsZHJlbltpXSApIHtcclxuICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuW2ldLnRhZ05hbWUgPT0gJ1VMJykge1xyXG4gICAgICBcdCAgcGFyZW50LmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NpdGUtbmF2X19zdWItbGlzdC0tYWN0aXZlJyk7XHJcbiAgICAgIFx0ICBzdWJNZW51U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgIFx0ICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaSsrO1xyXG4gIFx0ICB9XHRcclxuICBcdH1cclxuICB9XHJcbiAgZnVuY3Rpb24gYW5pbWF0ZUFkZChlbGVtLCBhbmltYXRlTmFtZSkge1xyXG4gIFx0ZWxlbS5jbGFzc0xpc3QuYWRkKGFuaW1hdGVOYW1lKTtcclxuICBcdGVsZW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnKTtcclxuICAgIFxyXG4gICAgXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVSZW1vdmUoZWxlbSwgYW5pbWF0ZU5hbWUpIHtcclxuICBcdGVsZW0uY2xhc3NMaXN0LnJlbW92ZShhbmltYXRlTmFtZSk7XHJcbiAgfVxyXG59KSh3aW5kb3csIGRvY3VtZW50KTtcclxuXHJcblxyXG4iLCI7KGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KSB7XHJcbiAgJ3VzZSBzdHJpY3QnXHJcblxyXG4gIHZhciBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2l0ZS1uYXYtdG9nZ2xlJyk7XHJcbiAgdmFyIGxpc3QgPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXRlLW5hdi1saXN0Jyk7XHJcblxyXG5cclxuICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4vL2xpc3QtbmF2XHJcbiAgICB2YXIgcmVtb3ZlTGlzdEFuaW1hdGUgPSByZW1vdmVBbmltYXRpb24oNzAwKTtcclxuICAgIHZhciByZW1vdmVEaXZBbmltYXRlID0gcmVtb3ZlQW5pbWF0aW9uKDcwMCk7XHJcblxyXG5cclxuICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdzaXRlLW5hdl9fbGlzdC0taGlkZGVuLXNtJyk7XHJcbiAgICB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnYW5pbWF0ZWQnKTtcclxuICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdmYWRlSW5SaWdodC0tc2l0ZS1uYXYnKTtcclxuICAgIHJlbW92ZUxpc3RBbmltYXRlKHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZywnZmFkZUluUmlnaHQtLXNpdGUtbmF2Jyk7XHJcbi8vdG9nZ2xlXHJcbiAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2FuaW1hdGVkJyk7XHJcbiAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3B1bHNlLS1zaXRlLW5hdicpO1xyXG4gICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzaXRlLW5hdl9fdG9nZ2xlLS1hY3RpdmUnKTtcclxuICAgIHJlbW92ZURpdkFuaW1hdGUodGhpcywncHVsc2UtLXNpdGUtbmF2Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlQW5pbWF0aW9uKHRpbWVyKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXJnLCBzdHIpIHtcclxuICAgICAgICB2YXIgc2F2ZVRoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgdmFyIHNhdmVBcmcgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgc2V0VGltZW91dCAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBmLmFwcGx5KHNhdmVUaGlzLCBzYXZlQXJnKVxyXG4gICAgICAgIH0sIHRpbWVyKTtcclxuICAgICAgfTtcclxuICAgICAgZnVuY3Rpb24gZihhcmcsIHN0cikge1xyXG4gICAgICAgYXJnLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGVkJyk7XHJcbiAgICAgICBhcmcuY2xhc3NMaXN0LnJlbW92ZSggc3RyICk7XHJcbiAgICAgIH07IFxyXG4gICAgfVxyXG4gIH1cclxufSkod2luZG93LCBkb2N1bWVudCk7IiwiOyhmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCkge1xyXG4gICd1c2Ugc3RyaWN0J1xyXG4vL0V2ZW50cyBzdGF0ZW1lbnRzIG9uIGNvbnRlbnRMb2FkZWRcclxuICB2YXIgc2xpZGVySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1oZWFkZXJfX2hlYWRlcicpLFxyXG4gICAgICBzbGlkZXJUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1oZWFkZXJfX3RleHQnKSxcclxuICAgICAgc2xpZGVyQnRuU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1oZWFkZXJfX2J0bicpLFxyXG4gICAgICBzbGlkZXJUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1oZWFkZXJfX3RvZ2dsZScpLFxyXG4gICAgICBhcnJDb250ZW50RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePXNsaWRlci1oZWFkZXJfX2NvbnRlbnQtXScpO1xyXG5cclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyVGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzbGlkZXJUYWJzW2ldLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGVkJyk7XHJcbiAgICAgIHNsaWRlclRhYnNbaV0uY2xhc3NMaXN0LmFkZCgnZmFkZUluRG93bkJpZycpO1xyXG4gICAgICBzbGlkZXJUYWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udGVudFByZXZOZXh0VG9nZ2xlKTtcclxuICAgICAgc2xpZGVyVGFic1tpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZUluRG93bkJpZycpOyBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVySGVhZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHNsaWRlckhlYWRlcltpXS5jbGFzc0xpc3QuYWRkKCdhbmltYXRlZCcpO1xyXG4gICAgICBzbGlkZXJIZWFkZXJbaV0uY2xhc3NMaXN0LmFkZCgnZmFkZUluRG93bicpOyBcclxuICAgIH0gXHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlclRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2xpZGVyVGV4dFtpXS5jbGFzc0xpc3QuYWRkKCdhbmltYXRlZCcpO1xyXG4gICAgICBzbGlkZXJUZXh0W2ldLmNsYXNzTGlzdC5hZGQoJ2ZhZGVJblVwJyk7IFxyXG4gICAgfSBcclxuICB9KTtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXJCdG5TdWJtaXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2xpZGVyQnRuU3VibWl0W2ldLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGVkJyk7XHJcbiAgICAgIHNsaWRlckJ0blN1Ym1pdFtpXS5jbGFzc0xpc3QuYWRkKCdmYWRlSW5VcCcpOyBcclxuICAgIH0gXHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGNvbnRlbnRQcmV2TmV4dFRvZ2dsZShldmVudCkge1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXItaGVhZGVyX190b2dnbGUtLW5leHQnKSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyckNvbnRlbnRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICggIWFyckNvbnRlbnRFbGVtZW50c1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlci1oZWFkZXJfX2NvbnRlbnQtLWhpZGRlbicpICYmIChpID09PSBhcnJDb250ZW50RWxlbWVudHMubGVuZ3RoIC0gMSkgKSB7XHJcbiAgICAgICAgICBhcnJDb250ZW50RWxlbWVudHNbaV0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyLWhlYWRlcl9fY29udGVudC0taGlkZGVuJyk7XHJcbiAgICAgICAgICBhcnJDb250ZW50RWxlbWVudHNbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyLWhlYWRlcl9fY29udGVudC0taGlkZGVuJyk7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2UgaWYgKCFhcnJDb250ZW50RWxlbWVudHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXItaGVhZGVyX19jb250ZW50LS1oaWRkZW4nKSkge1xyXG4gICAgICAgICAgYXJyQ29udGVudEVsZW1lbnRzW2ldLmNsYXNzTGlzdC5hZGQoJ3NsaWRlci1oZWFkZXJfX2NvbnRlbnQtLWhpZGRlbicpO1xyXG4gICAgICAgICAgYXJyQ29udGVudEVsZW1lbnRzWysraV0uY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyLWhlYWRlcl9fY29udGVudC0taGlkZGVuJyk7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlci1oZWFkZXJfX3RvZ2dsZS0tcHJldicpKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSBhcnJDb250ZW50RWxlbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBpZiAoICFhcnJDb250ZW50RWxlbWVudHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXItaGVhZGVyX19jb250ZW50LS1oaWRkZW4nKSAmJiAoaSA9PT0gMCkgKSB7XHJcbiAgICAgICAgICBhcnJDb250ZW50RWxlbWVudHNbaV0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyLWhlYWRlcl9fY29udGVudC0taGlkZGVuJyk7XHJcbiAgICAgICAgICBhcnJDb250ZW50RWxlbWVudHNbYXJyQ29udGVudEVsZW1lbnRzLmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlci1oZWFkZXJfX2NvbnRlbnQtLWhpZGRlbicpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIShhcnJDb250ZW50RWxlbWVudHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXItaGVhZGVyX19jb250ZW50LS1oaWRkZW4nKSkpIHtcclxuICAgICAgICAgIGFyckNvbnRlbnRFbGVtZW50c1tpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZXItaGVhZGVyX19jb250ZW50LS1oaWRkZW4nKTtcclxuICAgICAgICAgIGFyckNvbnRlbnRFbGVtZW50c1stLWldLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlci1oZWFkZXJfX2NvbnRlbnQtLWhpZGRlbicpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbn0pKHdpbmRvdywgZG9jdW1lbnQpO1xyXG4iXX0=
