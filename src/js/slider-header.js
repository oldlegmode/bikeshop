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

  document.querySelector('.slider-header__btn').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('section-popular').scrollIntoView(true);
  })


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
