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