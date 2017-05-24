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