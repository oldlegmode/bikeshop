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