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